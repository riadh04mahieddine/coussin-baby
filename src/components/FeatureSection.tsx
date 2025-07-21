"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const FeatureSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-gray-50">
      <motion.div 
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">La Sécurité Avant Tout</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Découvrez pourquoi notre coussin est le choix préféré des parents pour la protection de leur enfant.</p>
        </motion.div>

        <motion.div className="flex flex-col md:flex-row items-center gap-12 mb-20" variants={containerVariants}>
          <motion.div className="md:w-1/2 relative" variants={itemVariants}>
            <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden shadow-2xl border-8 border-white">
              <video className="w-full h-full object-cover" src="/coussinbaby.mp4" autoPlay loop muted playsInline />
            </div>
          </motion.div>
          <motion.div className="md:w-1/2" variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-pink-600">Tranquillité d&apos;Esprit pour les Parents</h3>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              Notre coussin de protection offre une tranquillité d&apos;esprit en protégeant la tête de votre bébé 
              lors des chutes en arrière pendant les moments de jeu et d&apos;exploration.
            </p>
            <ul className="space-y-4">
              {[
                { icon: CheckCircleIcon, text: "Absorption des chocs supérieure" },
                { icon: CheckCircleIcon, text: "Matériaux hypoallergéniques et sûrs" },
                { icon: CheckCircleIcon, text: "Conforme aux normes de sécurité européennes" },
              ].map((item, index) => (
                <motion.li key={index} className="flex items-center" variants={itemVariants}>
                  <item.icon className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-800">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div className="bg-white p-10 rounded-2xl shadow-xl" variants={containerVariants}>
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Confort et Praticité au Quotidien</h3>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                Le Coussin de Protection pour la Tête offre un ajustement sûr et confortable, permettant à votre bébé 
                de se déplacer librement et en toute confiance pendant qu&apos;il explore son environnement.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Sa conception ergonomique assure un maintien parfait sans entraver les mouvements naturels de votre enfant.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { title: "Léger", description: "Ne gêne pas les mouvements de bébé" },
                { title: "Ajustable", description: "S&apos;adapte à la croissance de votre enfant" },
                { title: "Facile à nettoyer", description: "Housse amovible et lavable en machine" },
                { title: "Design Adorable", description: "Un design qui plaira autant aux parents qu&apos;aux enfants" }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-100 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                >
                  <h4 className="font-bold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeatureSection;
