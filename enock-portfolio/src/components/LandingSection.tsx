
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { FloatingLogo, BgScene } from './ThreeScene';

const LandingSection = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section relative h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Enhanced Canvas Background with Stars */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <BgScene />
        </Canvas>
      </div>
      
      {/* Enhanced 3D Logo */}
      <div className="absolute w-full h-full pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} />
          <FloatingLogo />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      
      {/* Enhanced Content with Glow Effects */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 blur-3xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />

        <motion.h2 
          custom={0}
          variants={textVariants}
          className="text-xl md:text-2xl font-medium mb-4 text-white/70"
        >
          Hello, I'm
        </motion.h2>
        
        <motion.h1 
          custom={1}
          variants={textVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-purple text-shadow-glow relative"
        >
          <span className="relative inline-block">
            Enock Developer
            <motion.span 
              className="absolute inset-0 bg-neon-purple/20 blur-xl"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </span>
        </motion.h1>
        
        <motion.p 
          custom={2}
          variants={textVariants}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white/80"
        >
          Full-stack developer crafting innovative web experiences with 3D & motion design
        </motion.p>
        
        <motion.div 
          custom={3}
          variants={textVariants}
          className="flex flex-col md:flex-row gap-4 justify-center relative"
        >
          <motion.a
            href="#projects"
            className="px-8 py-4 rounded-md bg-neon-purple text-white font-medium transition-all hover:bg-neon-purple/80 border border-neon-purple shadow-lg shadow-neon-purple/25 relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-white/25 to-neon-purple/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            View Portfolio
          </motion.a>
          
          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-md bg-transparent border border-white/30 text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-white/10 to-neon-blue/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <a href="#about" className="flex flex-col items-center group">
          <span className="text-sm text-white/50 mb-2 group-hover:text-white/70 transition-colors">Scroll Down</span>
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1 group-hover:border-white/50 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default LandingSection;
