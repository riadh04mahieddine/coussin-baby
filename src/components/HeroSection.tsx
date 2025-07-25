"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('blanc');
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: string}>({});
  const [mainImage, setMainImage] = useState('/images/rose.png');
  const [isLoading, setIsLoading] = useState(false);

    const colors = [
    { name: 'Vert', image: '/images/vert.png' },
    { name: 'Rose', image: '/images/rose.png' },
    { name: 'Bleu', image: '/images/bleu.png' },
    { name: 'Jaune', image: '/images/jaune.png' },
    { name: 'Bleu-Clair', image: '/images/bleu-clair.png' },
  ];

  const bundles = [
    { id: 1, name: 'X1', originalPrice: 33.49, salePrice: 19.99, discountText: 'ÉCONOMISEZ 40%', badge: null },
    { id: 2, name: 'X2', originalPrice: 66.98, salePrice: 39.98, discountText: 'ÉCONOMISEZ 50%', badge: 'PRÉFÉRÉ', options: 2 },
    { id: 3, name: 'X3', originalPrice: 100.47, salePrice: 49.97, discountText: 'ÉCONOMISEZ 60%', badge: 'PREMIUM', options: 3 },
  ];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Trouver l'objet couleur correspondant et mettre à jour l'image principale
    const selectedColorObj = colors.find(c => c.name === color);
    if (selectedColorObj) {
      setMainImage(selectedColorObj.image);
    }
  };

  const handleBundleSelect = (bundleId: number) => {
    setSelectedBundle(bundleId);
    // Réinitialiser les options si on change de bundle
    setSelectedOptions({});
  };

  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: value
    });
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const renderOptions = () => {
    const bundle = bundles.find(b => b.id === selectedBundle);
    // S'assurer que le bundle et ses options sont valides
    if (!bundle || typeof bundle.options !== 'number' || bundle.options < 2) {
      return null;
    }

    return (
      <div className="mt-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-800">Choisissez vos couleurs :</h3>
        {Array.from({ length: bundle.options }, (_, i) => i + 1).map(index => {
          const optionId = `option${index}`;
          const selectedValue = selectedOptions[optionId];
          const selectedColorObject = colors.find(c => c.name === selectedValue);

          return (
            <div key={index} className="relative">
              <label className="text-sm font-medium text-gray-700">Coussin #{index}</label>
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === optionId ? null : optionId)}
                className="mt-1 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="flex items-center">
                  {selectedColorObject ? (
                    <Image src={selectedColorObject.image} alt={selectedColorObject.name} width={24} height={24} className="rounded-full" />
                  ) : (
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  )}
                  <span className="ml-3 block truncate">{selectedValue || 'Sélectionner une couleur'}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>

              {openDropdown === optionId && (
                <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {colors.map(color => (
                    <li
                      key={color.name}
                      onClick={() => { handleOptionChange(optionId, color.name); setOpenDropdown(null); }}
                      className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <Image src={color.image} alt={color.name} width={24} height={24} className="rounded-full" />
                        <span className="ml-3 block font-normal truncate">{color.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Récupérer le bundle sélectionné
      const bundle = bundles.find(b => b.id === selectedBundle);
      if (!bundle) {
        throw new Error('Bundle non trouvé');
      }
      
      // Préparer les données pour l'API
      const checkoutData = {
        color: selectedColor,
        bundle: bundle.id,
        options: selectedOptions,
        price: bundle.salePrice
      };
      
      // Appeler l'API pour créer une session de paiement
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Une erreur est survenue lors de la création de la session de paiement.');
      }

      // Rediriger vers la page de paiement Stripe
      router.push(data.url);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-4 pb-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg p-2 shadow-sm mb-2">
              <div className="relative aspect-square">
                <Image src={mainImage} alt="Coussin de protection bébé" fill style={{ objectFit: "contain" }} className="rounded-md" />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {colors.map((color) => (
                <div key={color.name} className={`border rounded-md p-1 min-w-[60px] cursor-pointer ${mainImage === color.image ? 'border-blue-500 ring-2 ring-blue-300' : 'hover:border-blue-500'}`} onClick={() => handleColorSelect(color.name)}>
                  <div className="relative w-full aspect-square">
                    <Image src={color.image} alt={color.name} fill style={{ objectFit: "contain" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Coussin Protection Anti-Chute Bébé – Coussin protection tête bébé</h1>
            
            <div className="flex items-center mt-3 gap-2">
            <Image src="/images/Google.svg.webp" alt="Avis Google" width={20} height={20} className="h-5 w-auto"/>              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>)}
              </div>
              <span className="text-sm text-gray-800">+450 avis clients</span>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-600">{bundles.find(b => b.id === selectedBundle)?.salePrice.toFixed(2)} €</span>
                <span className="text-xl text-gray-500 line-through">{bundles.find(b => b.id === selectedBundle)?.originalPrice.toFixed(2)} €</span>
              </div>
            </div>

            <div className="my-4 space-y-2 text-sm text-gray-700">
              <p><span className="text-xl mr-2">👶</span> Âge : <span className="font-semibold">1 à 3 ans</span></p>
              <p><span className="text-xl mr-2">🚫</span> <span className="font-semibold">Éviter les chutes</span> de bébé</p>
              <p><span className="text-xl mr-2">🧼</span> <span className="font-semibold">Nettoyage facile</span> à la machine : 30 degrés</p>
              <p><span className="text-xl mr-2">🌿</span> Coton PP ultra-doux, <span className="font-semibold">souple et résistant</span></p>
              
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex-grow">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800">1. Choisissez votre couleur</h3>
                <div className={`flex gap-2 flex-wrap ${selectedBundle > 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {colors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center">
                      <button disabled={selectedBundle > 1} onClick={() => handleColorSelect(color.name)} className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${selectedColor === color.name ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'}`}>
                        <Image src={color.image} alt={color.name} width={40} height={40} className="object-cover" />
                      </button>
                      <span className="text-xs mt-1 capitalize">{color.name}</span>
                    </div>
                  ))}
                </div>
                {selectedBundle > 1 && <p className="text-xs text-gray-500 mt-1">La couleur principale est désactivée. Choisissez les couleurs pour chaque coussin ci-dessous.</p>}
              </div>

              <div className="border-t border-gray-200 my-3"></div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 text-center">Choisissez votre quantité :</h3>
                <div className="flex justify-center items-stretch gap-3 sm:gap-4 max-w-[18rem] mx-auto">
                  {bundles.map((bundle) => {
                    const isSelected = selectedBundle === bundle.id;
                    return (
                      <div
                        key={bundle.id}
                        onClick={() => handleBundleSelect(bundle.id)}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 pt-8 text-center transition-all duration-300 flex-1 flex flex-col justify-center items-center ${isSelected ? 'border-pink-400 bg-pink-50 shadow-lg' : 'border-gray-300 bg-white hover:border-pink-300'}`}>
                        {bundle.badge && (
                          <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white ${bundle.badge === 'PREMIUM' ? 'bg-pink-500' : 'bg-pink-400'}`}>
                            {bundle.badge}
                          </div>
                        )}
                        <p className="text-2xl sm:text-3xl font-bold text-gray-800">{bundle.name}</p>
                        {bundle.discountText && (
                          <p className="mt-1 text-sm font-semibold text-gray-600">{bundle.discountText}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                {bundles.find(b => b.id === selectedBundle && (b.options ?? 0) > 1) && (
                  <div className="p-3 border-t border-gray-200">
                    {renderOptions()}
                  </div>
                )}
              </div>

              <button onClick={handleCheckout} disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105 relative text-lg flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Image src="/images/coussin-dallaitement.png" alt="Icone coussin" width={24} height={24} className="h-6 w-6" />
                    <span>Commander et Protéger mon bébé</span>
                  </>
                )}
              </button>
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">Garantie satisfait ou remboursé 30 jours</p>
                <div className="flex justify-center items-center mt-1">
                  <Image src="/images/logo-stripe_large.png" alt="Paiement sécurisé par Stripe, Visa, Mastercard" width={154} height={24} className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
