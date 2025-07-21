"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FaqItem = {
  question: string;
  answer: string;
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      question: "À partir de quel âge mon bébé peut-il utiliser ce coussin de protection ?",
      answer: "Notre coussin de protection est conçu pour les bébés à partir de 4 mois, lorsqu'ils commencent à s'asseoir, jusqu'à environ 24 mois. Il est particulièrement utile pendant la phase d'apprentissage de la position assise et des premiers pas."
    },
    {
      question: "Le coussin est-il lavable en machine ?",
      answer: "Oui, la housse extérieure est entièrement amovible et lavable en machine à 30°C. Le coussin intérieur peut être nettoyé à la main avec un chiffon humide et du savon doux."
    },
    {
      question: "Comment fixer correctement le coussin sur mon bébé ?",
      answer: "Le coussin se fixe facilement grâce à des sangles ajustables et des fermetures à scratch douces. Placez simplement le coussin sur le dos de votre bébé, passez les sangles sur ses épaules et fixez-les confortablement. Assurez-vous que le coussin est bien centré et que votre bébé peut bouger librement."
    },
    {
      question: "Le coussin est-il certifié selon les normes de sécurité ?",
      answer: "Absolument ! Notre coussin de protection est certifié conforme aux normes européennes de sécurité pour les produits de puériculture. Il a passé tous les tests de sécurité requis concernant les matériaux, la résistance et l'absence de substances nocives."
    },
    {
      question: "Puis-je utiliser le coussin dans un siège auto ou une poussette ?",
      answer: "Non, notre coussin de protection est spécifiquement conçu pour une utilisation pendant les activités d'éveil et de jeu. Il ne doit pas être utilisé dans les sièges auto, poussettes ou tout autre équipement disposant déjà de son propre système de retenue, car cela pourrait compromettre leur efficacité."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nous expédions généralement les commandes sous 24 à 48 heures. La livraison en France métropolitaine prend habituellement 2 à 4 jours ouvrables. Pour les DOM-TOM et l'international, comptez 5 à 10 jours ouvrables selon la destination."
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Questions Fréquentes
        </motion.h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-lg text-gray-800">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-pink-500 transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-gray-100">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
