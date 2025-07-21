import { Stripe } from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import stripe from '@/lib/stripe';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ [WEBHOOK] Erreur: Clé secrète de webhook non configurée.');
    return new NextResponse('Webhook Error: Missing secret', { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown webhook signature verification error';
    console.error(`❌ [WEBHOOK] Échec de la vérification de la signature: ${errorMessage}`);
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  console.log(`✅ [WEBHOOK] Événement reçu et vérifié: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`... [WEBHOOK] Traitement de la session: ${session.id}`);

    const { orderId } = session.metadata || {};

    if (!orderId) {
      console.error('❌ [WEBHOOK] Erreur: orderId non trouvé dans les métadonnées.');
      return new NextResponse('Error: Missing orderId in metadata', { status: 400 });
    }

    try {
      await connectToDatabase();
      const order = await Order.findById(orderId);

      if (!order) {
        console.error(`❌ [WEBHOOK] Commande ${orderId} non trouvée.`);
        return new NextResponse('Order not found', { status: 404 });
      }

      if (order.paymentStatus === 'completed') {
        console.log('... [WEBHOOK] La commande est déjà marquée comme complétée.');
        return NextResponse.json({ received: true });
      }

      // Récupérer la session complète pour avoir les détails de livraison
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['customer_details', 'shipping_details'],
      });

      // Utiliser une assertion de type pour contourner les erreurs de linter
      const sessionWithDetails = fullSession as any;

      if (sessionWithDetails.customer_details) {
        order.customerName = sessionWithDetails.customer_details.name || order.customerName;
        order.customerEmail = sessionWithDetails.customer_details.email || order.customerEmail;
        order.customerPhone = sessionWithDetails.customer_details.phone || order.customerPhone;
      }

      if (sessionWithDetails.shipping_details?.address) {
        const address = sessionWithDetails.shipping_details.address;
        order.shippingAddress = {
          name: sessionWithDetails.shipping_details.name || order.customerName,
          street: `${address.line1 || ''}${address.line2 ? `, ${address.line2}` : ''}`.trim(),
          city: address.city || '',
          postalCode: address.postal_code || '',
          country: address.country || '',
        };
      }

      order.paymentStatus = 'completed';
      order.stripeCheckoutId = session.id;
      order.stripePaymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
      order.updatedAt = new Date();

      await order.save();
      console.log(`✅ [WEBHOOK] Commande ${orderId} mise à jour avec succès.`);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown database or processing error';
      console.error('❌ [WEBHOOK] Erreur de base de données ou de traitement:', error);
      return new NextResponse(`Server Error: ${errorMessage}`, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
