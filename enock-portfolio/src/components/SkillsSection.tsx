
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Particles } from './ThreeScene';

interface Skill {
  name: string;
  level: number;
  color: string;
  category: 'frontend' | 'backend' | '3d' | 'design';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, color: '#61DAFB', category: 'frontend' },
  { name: 'TypeScript', level: 90, color: '#3178C6', category: 'frontend' },
  { name: 'Next.js', level: 85, color: '#000000', category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, color: '#06B6D4', category: 'frontend' },
  { name: 'Framer Motion', level: 88, color: '#0055FF', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 86, color: '#339933', category: 'backend' },
  { name: 'Express', level: 84, color: '#000000', category: 'backend' },
  { name: 'MongoDB', level: 82, color: '#47A248', category: 'backend' },
  { name: 'GraphQL', level: 78, color: '#E10098', category: 'backend' },
  { name: 'PostgreSQL', level: 80, color: '#4169E1', category: 'backend' },
  { name: 'Django', level: 75, color: '#47A248', category: 'backend' },
  { name: 'FastAPI', level: 78, color: '#E10098', category: 'backend' },
  { name: 'Flask', level: 85, color: '#339933', category: 'backend' },
  
  // 3D & WebGL
  { name: 'Three.js', level: 88, color: '#000000', category: '3d' },
  { name: 'React Three Fiber', level: 85, color: '#9b87f5', category: '3d' },
  { name: 'WebGL', level: 80, color: '#990000', category: '3d' },
  { name: 'GLSL Shaders', level: 75, color: '#8BC3FC', category: '3d' },
  
  // Design
  { name: 'Figma', level: 90, color: '#F24E1E', category: 'design' },
  { name: 'UX/UI Design', level: 85, color: '#FF61F6', category: 'design' },
  { name: 'Motion Design', level: 82, color: '#0ACF83', category: 'design' },
];

const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: '3d', name: '3D & WebGL' },
  { id: 'design', name: 'Design' },
];

const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const [activeCategory, setActiveCategory] = React.useState<string>('frontend');
  
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);
  
  return (
    <section id="skills" className="section py-20 md:py-32 relative" ref={containerRef}>
      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas>
          <Particles count={50} color="#1EAEDB" size={0.03} speed={0.02} />
        </Canvas>
      </div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity, y }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-mono font-bold mb-2 text-neon-blue">Skills</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Technical Expertise</h3>
          <p className="max-w-2xl mx-auto text-white/80">
            A comprehensive overview of my technical skills and proficiency levels across various domains of modern web development.
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id 
                  ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/25' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          key={activeCategory}
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              className="glass-card p-6 rounded-xl"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold">{skill.name}</h4>
                <span className="text-sm font-medium">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
