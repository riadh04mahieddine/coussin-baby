import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ReturnsPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de Retours et Remboursements</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <h2 className="text-2xl font-semibold mt-6">Droit de rétractation</h2>
            <p>Conformément aux dispositions de l&apos;article L.121-21 du Code de la Consommation, vous disposez d&apos;un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction sans avoir à justifier de motifs ni à payer de pénalité.</p>

            <h2 className="text-2xl font-semibold mt-6">Conditions de retour</h2>
            <p>Les retours sont à effectuer dans leur état d&apos;origine et complets (emballage, accessoires, notice). Dans ce cadre, votre responsabilité est engagée. Tout dommage subi par le produit à cette occasion peut être de nature à faire échec au droit de rétractation. [À compléter...]</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsPage;
