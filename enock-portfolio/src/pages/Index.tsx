
import React, { Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LandingSection from '../components/LandingSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  // Add a suspense fallback for any lazy-loaded components
  const LoadingSuspense = () => (
    <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/70">Loading...</p>
      </div>
    </div>
  );

  return (
    <motion.div 
      className="bg-dark text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      
      <Suspense fallback={<LoadingSuspense />}>
        <main>
          <LandingSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </Suspense>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
