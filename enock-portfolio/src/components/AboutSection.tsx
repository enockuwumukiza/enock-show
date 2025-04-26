
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [100, 0, 0, -100]);
  
  return (
    <section id="about" className="section py-20 md:py-32 relative" ref={containerRef}>
      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, scale, y }}
      >
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <motion.div 
              className="glass-card p-1 rounded-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square w-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 rounded-xl overflow-hidden">
                <motion.div 
                  className="w-full h-full bg-dark-secondary flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl">👨‍💻</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-mono font-bold mb-2 text-neon-blue">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Crafting Digital Experiences</h3>
              <div className="space-y-4 text-white/80">
                <p>
                  I'm a passionate full-stack developer with over 3 years of experience building innovative web applications that push the boundaries of user experience.
                </p>
                <p>
                  My expertise lies in combining cutting-edge technologies like MERN stack, FARM stack to create immersive, interactive experiences that captivate users and drive engagement.
                </p>
                <p>
                  I'm driven by the challenge of turning complex problems into elegant solutions, always keeping performance and accessibility at the forefront of my development process.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-2xl font-bold text-gradient-purple mb-2">20+</div>
                  <div className="text-sm text-white/70">Projects Completed</div>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <div className="text-2xl font-bold text-gradient-blue mb-2">3+</div>
                  <div className="text-sm text-white/70">Years Experience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
