import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Calculatorsection from "@/components/calculator-section";
import ServicesSection from "@/components/services-section";
import NetworkSection from "@/components/network-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  console.log("Home page rendered");

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ContactSection />
        <Calculatorsection />
        <ServicesSection />
        <NetworkSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-md opacity-90"></div>
                </div>
                <h3 className="text-xl font-bold">DIMENIONARE GAZE NATURALE</h3>
              </div>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Specializați în proiectarea și dimensionarea sistemelor de distribuție gaze naturale
                cu presiune redusă și medie.
              </p>
              <div className="flex items-center gap-2 text-blue-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Disponibil pentru consultanță</span>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">SI</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">0749 920 392</p>
                    <p className="text-slate-400 text-sm">Inginer Specialist</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servicii Principale</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Dimensionare presiune redusă</li>
                <li>• Dimensionare presiune medie</li>
                <li>• Consultanță tehnică</li>
                <li>• Documentație completă</li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} DIMENIONARE GAZE NATURALE. Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>🇷🇴 România</span>
              <span>•</span>
              <span>Conform ANRE</span>
              <span>•</span>
              <span>ISO 9001</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
