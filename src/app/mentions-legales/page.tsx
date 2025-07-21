import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LegalPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Mentions Légales</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance des utilisateurs et visiteurs du site Coussin Baby les présentes mentions légales.</p>
            
            <h2 className="text-2xl font-semibold mt-6">Éditeur du site</h2>
            <p><strong>Nom de l&apos;entreprise :</strong> [À compléter]</p>
            <p><strong>Forme juridique :</strong> [À compléter]</p>
            <p><strong>Adresse :</strong> [À compléter]</p>
            <p><strong>Capital social :</strong> [À compléter]</p>
            <p><strong>Email :</strong> [À compléter]</p>
            <p><strong>Numéro de SIRET :</strong> [À compléter]</p>
            <p><strong>Directeur de la publication :</strong> [À compléter]</p>

            <h2 className="text-2xl font-semibold mt-6">Hébergeur</h2>
            <p>L&apos;hébergement du site est assuré par la société Vercel Inc., dont le siège social est situé au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
