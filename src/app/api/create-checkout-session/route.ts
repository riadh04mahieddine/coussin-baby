import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import connectToDatabase from '@/lib/mongodb';
import Order, { IBundle } from '@/models/Order';

interface CheckoutRequestBody {
  color: string;
  bundle: IBundle;
  options?: { [key: string]: string };
  price: number;
  customerEmail?: string;
}

export async function POST(request: Request) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { color, bundle, options, price, customerEmail } = body;

    if (!color || !bundle || !price) {
      return NextResponse.json({ error: 'Données de produit manquantes' }, { status: 400 });
    }

    let optionsDescription = '';
    if (options && Object.keys(options).length > 0) {
      optionsDescription = Object.entries(options)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }

    const priceInCents = Math.round(price * 100);
    
    console.log('Création de session Stripe Checkout...');
    console.log('Produit :', { color, bundle, price, options });
    
    // Connexion à la base de données
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Erreur de connexion à MongoDB:', dbError);
      return NextResponse.json({ error: 'Erreur de base de données' }, { status: 500 });
    }
    
    // Création de la commande initiale
    const newOrder = await Order.create({
      customerName: customerEmail ? 'Client' : 'Client anonyme',
      customerEmail: customerEmail || 'anonyme@example.com',
      shippingAddress: {
        street: 'En attente de paiement',
        city: 'En attente de paiement',
        postalCode: 'En attente de paiement',
        country: 'France',
      },
      product: {
        name: 'Coussin de Protection pour la Tête',
        color,
        bundle,
        options,
        price,
      },
      paymentStatus: 'pending',
    });
    
    console.log('Commande initiale créée avec ID:', newOrder._id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Coussin de Protection pour la Tête',
              description: `Couleur: ${color}, Pack: ${bundle}${optionsDescription ? `, Options: ${optionsDescription}` : ''}`,
              // Utilisation du domaine personnalisé pour l'URL de l'image
              images: [`https://www.coussinbaby.com/images/cushion-1.png`],
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Utilisation du domaine personnalisé pour les URLs
      success_url: `https://www.coussinbaby.com/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.coussinbaby.com/`,
      locale: 'fr',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT', 'GB'],
      },
      phone_number_collection: {
        enabled: true,
      },
      customer_email: customerEmail || undefined,
      metadata: {
        orderId: newOrder._id.toString(),
        productColor: color,
        productBundle: JSON.stringify(bundle),
        productPrice: price.toString(),
        productOptions: options ? JSON.stringify(options) : '',
        customerEmailInitial: customerEmail || '',
      },
    });

    console.log('Session Stripe créée avec succès :', session.id);
    console.log('Metadata envoyée :', {
      productName: 'Coussin de Protection pour la Tête',
      productColor: color,
      productBundle: bundle,
      productPrice: price,
      customerEmailInitial: customerEmail || ''
    });
    
    return NextResponse.json({ url: session.url });

  } catch (error: unknown) {
    console.error('Erreur lors de la création de la session de paiement:', error);
    const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
