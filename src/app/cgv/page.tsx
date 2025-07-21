import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CgvPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Conditions Générales de Vente</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <h2 className="text-2xl font-semibold mt-6">Article 1 : Objet</h2>
            <p>Les présentes conditions régissent les ventes par la société [Nom de votre société] de coussins de protection pour bébé. [À compléter avec le reste de vos CGV...]</p>
            
            <h2 className="text-2xl font-semibold mt-6">Article 2 : Prix</h2>
            <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d&apos;expédition. [À compléter...]</p>

            <h2 className="text-2xl font-semibold mt-6">Article 3 : Commandes</h2>
            <p>Vous pouvez passer commande sur notre site internet coussinbaby.fr. [À compléter...]</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CgvPage;
