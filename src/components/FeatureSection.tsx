"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Titre principal */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Protégez la Tête de Votre Bébé Lors des Chutes
        </motion.h2>

        {/* Section principale */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
          {/* Image circulaire */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-xl">
              <video 
                src="/coussinbaby.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-pink-600">Tranquillité d'Esprit pour les Parents</h3>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              Notre coussin de protection offre une tranquillité d'esprit en protégeant la tête de votre bébé 
              lors des chutes en arrière pendant les moments de jeu et d'exploration.
            </p>
            <ul className="space-y-4">
              {[
                "Protection douce mais efficace contre les chocs",
                "Design ergonomique adapté à la morphologie des bébés",
                "Matériaux respirants et hypoallergéniques"
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mt-1 text-pink-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Deuxième section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-blue-600">Sécurité en Déplacement</h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                Le Coussin de Protection pour la Tête offre un ajustement sûr et confortable, permettant à votre bébé 
                de se déplacer librement et en toute confiance pendant qu'il explore son environnement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Conçu par des experts en sécurité infantile, notre coussin s'adapte parfaitement à la morphologie 
                de votre enfant tout en lui offrant une liberté de mouvement optimale.
              </p>
            </div>
            
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { title: "Léger", description: "Ne gêne pas les mouvements de bébé" },
                { title: "Ajustable", description: "S'adapte à la croissance de votre enfant" },
                { title: "Facile à nettoyer", description: "Housse amovible et lavable en machine" },
                { title: "Certifié", description: "Répond aux normes de sécurité européennes" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gradient-to-br from-blue-50 to-pink-50 p-4 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-pink-600 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
