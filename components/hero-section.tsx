"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

export default function HeroSection() {
  console.log("HeroSection component rendered");
  
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.2)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(96,165,250,0.15)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Floating Network Nodes */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-4 h-4 bg-blue-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-500 rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-60 left-1/3 w-3 h-3 bg-blue-200 rounded-full animate-float opacity-50" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-70" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 font-medium">Specializat în Gaze Naturale</span>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            DIMENSIONARE SISTEME
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300">
              DISTRIBUȚIE GAZE
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-slate-300 font-normal">
              Presiune Redusă și Medie
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Proiectare profesională sisteme distribuție gaze naturale - Șutac Ion
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <a 
              href="#contact"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3"
              onClick={() => console.log("Contact CTA clicked")}
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Trimite Cererea
            </a>
            <a 
              href="#servicii"
              className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
              onClick={() => console.log("Services CTA clicked")}
            >
              Vezi Serviciile
            </a>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-slate-400 text-sm">Descoperă mai mult</span>
            <ArrowDown className="w-5 h-5 text-slate-400 animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}