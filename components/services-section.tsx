"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Gauge, Zap, Settings, FileText, CheckCircle } from "lucide-react";

export default function ServicesSection() {
  console.log("ServicesSection component rendered");
  
  const services = [
    {
      icon: Gauge,
      title: "Presiune Redusă",
      description: "Rețele distribuție cu presiune redusă (până la 100 mbar) pentru zone rezidențiale și comerciale.",
      features: ["Calcul debit", "Diametru optimal", "Cost eficient"]
    },
    {
      icon: Zap,
      title: "Presiune Medie", 
      description: "Sisteme presiune medie (0.1 - 4 bar) pentru consumatori industriali și mari instalații.",
      features: ["Analiza presiuni", "Stații reglare", "Siguranță"]
    },
    {
      icon: Shield,
      title: "Consultanță",
      description: "Expertiză specializată conform normelor ANRE și standardelor europene.",
      features: ["Audit proiecte", "Optimizare", "Conformitate"]
    },
    {
      icon: FileText,
      title: "Documentație",
      description: "Documentație completă pentru autorizare și execuție proiecte gaze naturale.",
      features: ["Memorii tehnice", "Planuri", "Specificații"]
    }
  ];

  return (
    <section id="servicii" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Servicii <span className="text-blue-600">Specializate</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Soluții complete pentru dimensionarea sistemelor de distribuție gaze naturale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}