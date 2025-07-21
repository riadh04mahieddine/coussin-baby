import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('La variable d\'environnement STRIPE_SECRET_KEY n\'est pas définie');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Utilisez la version la plus récente de l'API Stripe
});

export default stripe;
