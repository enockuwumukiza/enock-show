import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ProjectSphere } from './ThreeScene';
import { Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Immersive 3D Product Viewer",
    description: "A WebGL-powered 3D product configurator that allows users to customize and view products in real-time with photorealistic rendering.",
    technologies: ["React", "Three.js", "WebGL", "GLSL"],
    image: "placeholder.svg",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 2,
    title: "Music & Video Player",
    description: "Platform Where You can listen to music and watch relaxing videos",
    technologies: ["ReactJS", "ExpressJS", "NodeJS", "MongoDB"],
    image: "/images/mus1.png",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 3,
    title: "Real-time Collaborative Workspace",
    description: "A collaborative workspace application with real-time synchronization, allowing teams to work together seamlessly across different locations.",
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    image: "/images/chat.PNG",
    demoUrl: "https://echat-fieq.onrender.com/",
    codeUrl: "https://github.com/enockuwumukiza/eChat"
  },
  {
    id: 4,
    title: "Real-time Crypto Price Tracker",
    description: "Platform where you can view all your crypto prices, filter Top Gainers, Top Losers and Market Cap",
    technologies: ["React", "Websockets", "Framer", "MongoDB"],
    image: "/images/crypto.PNG",
    demoUrl: "https://crypto-tracker-pi-rouge.vercel.app",
    codeUrl: "https://github.com/enockuwumukiza/crypto-tracker"
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  return (
    <section id="projects" className="section py-20 md:py-32 relative" ref={containerRef}>
      <motion.div 
        className="container mx-auto px-4"
        style={{ opacity, y }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-mono font-bold mb-2 text-neon-purple">Projects</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Featured Work</h3>
          <p className="max-w-2xl mx-auto text-white/80">
            Explore my latest projects showcasing innovative solutions and creative approaches to modern web development challenges.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* 3D Project Visualization */}
          <div className="h-64 md:h-80 mb-12 relative">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              
              {projects.map((project, index) => (
                <ProjectSphere 
                  key={project.id}
                  index={index}
                  position={[(index - 1) * 3, 0, 0]}
                  hovered={hoveredProject === project.id}
                />
              ))}
            </Canvas>
          </div>
          
          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="glass-card rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: project.id * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="aspect-video w-full bg-dark-tertiary overflow-hidden">
                  <motion.img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-white/70 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.a
                      href={project.demoUrl}
                      target='_blank'
                      className="text-sm font-medium text-neon-blue hover:text-neon-blue/80 link-underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Demo
                    </motion.a>
                    <motion.a
                      href= {project.codeUrl}
                      target='_blank'
                      className="text-sm font-medium text-white/70 hover:text-white link-underline flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
