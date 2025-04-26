
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-dark-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-0"
          >
            <Link to="/" className="text-2xl font-mono font-bold text-gradient-purple">
              EnockPortfolio
            </Link>
            <p className="text-white/50 mt-2">
              Creating digital experiences that inspire.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-end"
          >
            <div className="flex gap-6 mb-4">
              <a href="#projects" className="text-white/70 hover:text-white transition-colors">Projects</a>
              <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-white/50 text-sm">
              © {currentYear} Enock Developer. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
