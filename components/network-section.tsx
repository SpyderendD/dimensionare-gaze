"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Building, Zap } from "lucide-react";

export default function NetworkSection() {
  console.log("NetworkSection component rendered");
  
  const achievements = [
    {
      icon: Award,
      title: "Certificări",
      description: "Autorizații ANRE și certificări conform normelor europene.",
      details: ["ANRE Autorizat", "ISO 9001", "Norme EU", "Actualizat"]
    },
    {
      icon: Building,
      title: "Proiecte",
      description: "Experiență în diverse tipuri de sisteme și consumatori.",
      details: ["Rezidențiale", "Comerciale", "Industriale", "Publice"]
    },
    {
      icon: Zap,
      title: "Tehnologii",
      description: "Metode moderne pentru optimizarea sistemelor de gaze.",
      details: ["Calcul hidraulic", "Simulări", "Optimizare", "Software CAD"]
    },
    {
      icon: Users,
      title: "Parteneriate",
      description: "Colaborări cu operatori și furnizori din industrie.",
      details: ["Operatori", "Furnizori", "Institute", "Autorități"]
    }
  ];

  return (
    <section id="retea" className="py-24 bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Expertiză <span className="text-blue-600">Profesională</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Soluții conforme standardelor ANRE și normelor europene de siguranță
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <achievement.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {achievement.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {achievement.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-blue-400">
            Conformitate 100% ANRE • Răspuns în 24h
          </h3>
          <p className="text-slate-300">
            Toate proiectele respectă normele de siguranță și calitate
          </p>
        </motion.div>
      </div>
    </section>
  );
}