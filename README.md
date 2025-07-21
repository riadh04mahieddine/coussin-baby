# CoussinBébé - Landing Page E-commerce

Ce projet est une landing page pour des coussins de protection pour bébés qui protègent la tête et le dos lors des chutes. Développé avec Next.js 15.4.1 et Tailwind CSS, il intègre Stripe pour le paiement et MongoDB pour la gestion des commandes.

## Fonctionnalités

- Design moderne avec palette de couleurs pastel (rose, bleu, violet)
- Animations fluides avec framer-motion
- Sélection de couleurs pour le produit
- Galerie d'images avec miniatures cliquables
- Options d'achat avec différents packs
- FAQ interactive avec accordéon
- Paiement sécurisé via Stripe
- Base de données MongoDB pour stocker les commandes

## Prérequis

- Node.js 18.x ou supérieur
- Compte Stripe (pour les paiements)
- Base de données MongoDB (locale ou Atlas)

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
```

## Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```
# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_votre_clé_secrète_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_clé_secrète_webhook
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_votre_clé_publique_stripe

# MongoDB
MONGODB_URI=mongodb://localhost:27017/coussinbaby
# Ou pour MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coussinbaby
```

## Démarrage

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## Configuration de Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API dans le tableau de bord Stripe
3. Pour tester les paiements, utilisez les cartes de test Stripe :
   - Numéro : 4242 4242 4242 4242
   - Date : N'importe quelle date future
   - CVC : N'importe quels 3 chiffres

## Configuration du webhook Stripe

Pour les environnements de développement, utilisez l'outil Stripe CLI pour rediriger les webhooks :

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Pour la production, configurez un webhook dans le tableau de bord Stripe pointant vers `https://votre-domaine.com/api/webhook`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
