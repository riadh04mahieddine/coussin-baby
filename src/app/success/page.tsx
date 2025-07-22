import React from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import stripe from '@/lib/stripe';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConversionTracker from '@/components/ConversionTracker';

async function getOrderDetails(sessionId: string) {
  try {
    // On a juste besoin de la session pour récupérer l'ID de notre commande
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata?.orderId) {
      throw new Error('ID de commande manquant dans les métadonnées Stripe.');
    }

    await connectToDatabase();
    const order = await Order.findById(session.metadata.orderId);

    if (!order) {
      throw new Error('Commande non trouvée dans la base de données.');
    }

    // Logs pour déboguer
    console.log("Détails de la commande récupérés:", {
      id: order._id,
      color: order.product.color,
      bundle: order.product.bundle,
      options: order.product.options
    });
    
    // On retourne uniquement la commande de notre base de données
    return { order };
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande:", error);
    return null;
  }
}

// Utilisation d'un type simple pour éviter les erreurs de build
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SuccessPage({ searchParams }: { searchParams: any }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    redirect('/');
  }

  const details = await getOrderDetails(sessionId);

  if (!details) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Erreur de Commande</h1>
            <p className="text-gray-600 mt-2">Nous n&apos;avons pas pu charger les détails de votre commande. Veuillez vérifier vos emails ou contacter le support.</p>
            <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg">Retour à l&apos;accueil</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { order } = details;

  return (
    <>
      <Header />
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Merci pour votre commande !</h1>
            <p className="mt-2 text-lg text-gray-600">Votre commande a été confirmée et est en cours de préparation.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne de gauche: Récapitulatif */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Récapitulatif de la commande</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>N° de commande:</span>
                    <span className="font-medium text-gray-900">#{order._id.toString().slice(-6).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Date:</span>
                    <span className="font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Total:</span>
                    <span className="font-medium text-gray-900">{order.product.price.toFixed(2)} €</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-gray-800 mb-4">Articles commandés</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {/* Affichage de l'image en fonction de la couleur du produit */}
                      <Image 
                        src={`/images/${String(order.product.color).toLowerCase()}.png`} 
                        alt={`Coussin Bébé ${order.product.color}`} 
                        width={60} 
                        height={60} 
                        className="rounded-md" 
                        onError={(e) => {
                          // Image de secours en cas d'erreur
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/rose.png';
                        }}
                      />
                      <div>
                        <p className="font-semibold">{order.product.name} (Pack de {order.product.bundle})</p>
                        <div className="text-sm text-gray-500 capitalize">
                          {order.product.options && order.product.options.size > 0 && Array.from(order.product.options.values()).map((color, index) => (
                            <p key={index}>Choix {index + 1}: {String(color).replace('-', ' ')}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonne de droite: Statut */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Statut</h2>
                  <div className="flex items-center text-gray-600 space-x-3">
                    <span className="bg-yellow-200 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">En cours de préparation</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">Vous recevrez un email de confirmation d&apos;expédition dès que votre colis sera en route.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/" className="inline-block bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Continuer mes achats
              </Link>
              {/* Ajout du tracker de conversion TikTok */}
              <ConversionTracker 
                orderValue={order.product.price} 
                productName={order.product.name}
                orderId={order._id.toString()}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
