import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contactez-nous</h1>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>Pour toute question ou demande d&apos;information, n&apos;hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous répondre dans les plus brefs délais.</p>
            <p className="font-semibold text-lg">Par email :</p>
            <a href="mailto:contact@coussinbaby.fr" className="text-blue-600 hover:underline text-xl">contact@coussinbaby.fr</a>
            <p className="mt-4">Ou via nos réseaux sociaux.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
