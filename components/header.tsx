"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Menu, X } from "lucide-react";

export default function Header() {
  console.log("Header component rendered");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-5 h-5 bg-white rounded-md opacity-90"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DIMENSIONARE GAZE NATURALE</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#servicii" className="text-slate-300 hover:text-white transition-colors font-medium relative group">
            Servicii
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="#retea" className="text-slate-300 hover:text-white transition-colors font-medium relative group">
            Expertiză
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></div>
          </a>
          <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium relative group">
            Contact
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></div>
          </a>
        </nav>

        {/* Contact Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <a 
            href="#contact"
            className="hidden sm:flex bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl rounded-xl px-6 py-2 items-center gap-2 font-medium"
            onClick={() => console.log("Contact button clicked")}
          >
            <Mail className="w-4 h-4" />
            Contact
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a 
              href="#servicii" 
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicii
            </a>
            <a 
              href="#retea" 
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Expertiză
            </a>
            <a 
              href="#contact" 
              className="block text-slate-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white mt-4 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                console.log("Mobile contact clicked");
              }}
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}