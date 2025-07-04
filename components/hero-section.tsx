"use client";

import { MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";

// NOU: Am extras conținutul interactiv într-o componentă separată pentru claritate
function InteractiveContent() {
  // Hook-uri pentru a gestiona efectul de înclinare 3D
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  // useTransform mapează o valoare dintr-un interval în altul.
  // Aici, mapăm poziția mouse-ului pe axa X la o rotație pe axa Y.
  const rotateX = useTransform(
    mouseY,
    // Când mouseY e 0 (sus), rotateX e 10deg. Când e la înălțimea ferestrei, e -10deg.
    [0, typeof window !== 'undefined' ? window.innerHeight : 1000],
    [10, -10]
  );
  const rotateY = useTransform(
    mouseX,
    // Când mouseX e 0 (stânga), rotateY e -10deg. Când e la lățimea ferestrei, e 10deg.
    [0, typeof window !== 'undefined' ? window.innerWidth : 1000],
    [-10, 10]
  );

  return (
    <motion.div
      onMouseMove={(e) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
      }}
      onMouseLeave={() => {
        // Resetează la o valoare neutră când mouse-ul părăsește elementul
        mouseX.set(Infinity);
        mouseY.set(Infinity);
      }}
      // Aplicăm rotațiile calculate
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Esențial pentru ca efectul 3D să funcționeze
      }}
      className="relative z-10 text-center"
    >
      {/* Aici începe conținutul tău, neschimbat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-8"
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-blue-300 font-medium">Specializat în Gaze Naturale</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-300 to-cyan-300 font-bold mb-6"
        style={{ transform: "translateZ(75px)" }} // Adaugă adâncime titlului
      >
        DIMENSIONARE SISTEME
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-300 to-cyan-300">
          DISTRIBUȚIE GAZE
        </span>
        <br />
        <span className="text-2xl md:text-3xl lg:text-4xl text-slate-300 font-normal">
          Presiune Redusă și Medie
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        style={{ transform: "translateZ(50px)" }} // Adaugă adâncime subtitlului
      >
        Proiectare profesională sisteme distribuție gaze naturale
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        style={{ transform: "translateZ(50px)" }} // Adaugă adâncime butoanelor
      >
        <a 
          href="#contact"
          className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3"
        >
          <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Trimite Cererea
        </a>
        <a 
          href="#servicii"
          className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400 hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
        >
          Vezi Serviciile
        </a>
      </motion.div>
      
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
  );
}

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      // NOU: Am adăugat perspective pentru a activa spațiul 3D
      style={{ perspective: "1000px" }}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center overflow-hidden"
    >
      {/* Background Pattern & Floating Nodes - neschimbat */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.2)_0%,transparent_50%)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(96,165,250,0.15)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,197,253,0.1)_0%,transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 right-20 w-4 h-4 bg-blue-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
      {/* ... restul nodurilor ... */}

      {/* MODIFICAT: Aici este conținutul principal, acum într-o componentă separată */}
      <div className="px-4 max-w-7xl mx-auto">
        <InteractiveContent />
      </div>

      {/* NOU: Spotlight-ul care stă DEASUPRA tuturor elementelor */}
      <motion.div
        className="
          pointer-events-none 
          absolute 
          -inset-px 
          rounded-xl 
          opacity-100
          z-20
          mix-blend-lighten
        "
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(147, 197, 253, 0.15),
              transparent 80%
            )
          `,
        }}
      />
    </section>
  );
}