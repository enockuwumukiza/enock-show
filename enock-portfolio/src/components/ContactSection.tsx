import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all";
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/enockuwumukiza", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/posts/enock-uwumukiza-3086082b4_im-happy-to-share-that-ive-obtained-a-new-activity-7310640637400207361-c9fc/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEuNf7gB2T3tEaX3NOqQsqySTYKxxtR3K_o", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/enochrw7?t=7ARzKOwXPjAfcxz5CIQsxA&s=08", label: "Twitter" },
    { icon: Mail, href: "mailto:enockuwumukiza850@gmail.com", label: "Email" }
  ];
  
  return (
    <section id="contact" className="section py-20 md:py-32 relative overflow-hidden">
      {/* Add a subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              "radial-gradient(circle at 30% 30%, rgba(155,135,245,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(155,135,245,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(155,135,245,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Existing content with enhanced animations */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl font-mono font-bold mb-2 text-neon-pink"
            whileHover={{ scale: 1.05 }}
          >
            Let's Connect
          </motion.h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Start a Conversation</h3>
          <p className="max-w-2xl mx-auto text-white/80">
            Ready to bring your vision to life? I'm excited to hear about your project and explore how we can create something amazing together.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="glass-card p-8 rounded-xl">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={inputClasses}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : null}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="md:col-span-2">
              <div className="glass-card p-8 rounded-xl h-full">
                <h4 className="text-xl font-bold mb-6">Connect With Me</h4>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-white/50 text-sm mb-1">Email</p>
                    <a 
                      href="mailto:hello@example.com" 
                      className="text-white hover:text-neon-blue transition-colors"
                    >
                      enockuwumukiza850@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Based in</p>
                    <p className="text-white">Kigali, Rwanda</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/50 text-sm mb-4">Follow me on</p>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={link.label}
                      >
                        <link.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add a creative CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-neon-purple font-medium mb-4">
            🚀 Available for Freelance Projects
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Currently accepting new clients
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
