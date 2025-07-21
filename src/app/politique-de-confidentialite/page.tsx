import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Confidentialité</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>Cette politique de confidentialité décrit comment vos informations personnelles sont collectées, utilisées et partagées lorsque vous visitez ou effectuez un achat sur coussinbaby.fr.</p>

            <h2 className="text-2xl font-semibold mt-6">Informations personnelles que nous collectons</h2>
            <p>Lorsque vous visitez le Site, nous collectons automatiquement certaines informations sur votre appareil... [À compléter avec les détails sur la collecte de données, cookies, etc.]</p>

            <h2 className="text-2xl font-semibold mt-6">Vos droits</h2>
            <p>Si vous êtes un résident européen, vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet et de demander que vos informations personnelles soient corrigées, mises à jour ou supprimées. [À compléter...]</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
