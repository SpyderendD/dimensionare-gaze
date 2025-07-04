"use client";

import { useState, useMemo, MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";

// MODIFICAT: Am importat ambele imagini
import autocadBg from "@/assets/images/autocad-bg.png"; 
import breviaryBG from "@/assets/images/breviary-bg.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Gauge, Ruler, Settings, Info, ChevronsRight } from "lucide-react";

// NOU: Date structurate pentru materiale și diametre standard
const pipeData = [
  {
    id: "pe",
    name: "Polietilenă (PEHD SDR11)",
    sizes: [
      { dn: 25, id: 19.2 },
      { dn: 32, id: 26.2 },
      { dn: 40, id: 32.8 },
      { dn: 50, id: 41.0 },
      { dn: 63, id: 51.6 },
      { dn: 75, id: 61.4 },
      { dn: 90, id: 73.6 },
      { dn: 110, id: 90.0 },
      { dn: 125, id: 102.2 },
      { dn: 160, id: 130.8 },
    ],
  },
  {
    id: "steel",
    name: "Oțel (tras sau sudat)",
    sizes: [
      { dn: 20, id: 21.6 }, // 3/4"
      { dn: 25, id: 27.2 }, // 1"
      { dn: 32, id: 36.0 }, // 1 1/4"
      { dn: 40, id: 41.8 }, // 1 1/2"
      { dn: 50, id: 53.0 }, // 2"
      { dn: 65, id: 68.8 }, // 2 1/2"
      { dn: 80, id: 80.8 }, // 3"
      { dn: 100, id: 104.0 }, // 4"
      { dn: 125, id: 129.5 }, // 5"
      { dn: 150, id: 155.0 }, // 6"
    ],
  },
  {
    id: "copper",
    name: "Cupru",
    sizes: [
      { dn: 15, id: 13.0 },
      { dn: 18, id: 16.0 },
      { dn: 22, id: 20.0 },
      { dn: 28, id: 26.0 },
      { dn: 35, id: 32.0 },
      { dn: 42, id: 39.0 },
    ],
  },
];

interface CalculationResult {
  calculatedDiameter: number;
  recommendedPipe: { dn: number; id: number };
  materialName: string;
}

export default function CalculatorSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  const [formData, setFormData] = useState({
    flow: "50",
    pressureDrop: "1",
    material: "pe",
    length: "100",
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const Q = parseFloat(formData.flow);
    const L = parseFloat(formData.length);
    const dP = parseFloat(formData.pressureDrop);

    if (Q > 0 && L > 0 && dP > 0) {
      const S = 0.6; 
      const K = 29.3;

      const calculatedDiameter = Math.pow((Math.pow(Q, 2) * S * L) / (Math.pow(K, 2) * dP), 1 / 5);

      const selectedMaterial = pipeData.find(m => m.id === formData.material);
      if (selectedMaterial) {
        const recommendedPipe = selectedMaterial.sizes.find(
          (size) => size.id >= calculatedDiameter
        );

        if (recommendedPipe) {
          setResult({
            calculatedDiameter,
            recommendedPipe,
            materialName: selectedMaterial.name,
          });
        } else {
          setResult(null); 
          alert("Debitul este prea mare pentru diametrele standard disponibile. Vă rugăm verificați datele.");
        }
      }
    }
  };

  return (
    <section 
      id="calculator" 
      onMouseMove={handleMouseMove}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* MODIFICAT: Am schimbat fundalul principal pentru a fi mai generic, imaginile fiind acum parte din conținut */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-900" />
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.15), transparent 80%)`}} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Calculator și Context Tehnic</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">Utilizați calculatorul de dimensionare și vizualizați contextul tehnic — planul rețelei și baza de calcul.</p>
        </div>

        {/* NOU: Structură pe 2 coloane pentru desktop */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* COLOANA 1: Imaginile */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
                viewport={{ once: true }}
                className="flex flex-col gap-6"
            >
                {/* Imaginea 1: AutoCAD */}
                <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl border border-white/10 group">
                    <Image 
                        src={autocadBg} 
                        alt="Plan rețea de gaze în AutoCAD" 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        quality={85} 
                        priority 
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
                        <h3 className="font-semibold text-white">Plan Situație Rețea Gaze</h3>
                    </div>
                </div>

                {/* Imaginea 2: Breviar de Calcul */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl border border-white/10 group">
                    <Image 
                        src={breviaryBG} 
                        alt="Breviar de calcul pentru conducte de gaze naturale" 
                        fill 
                        style={{ objectFit: 'cover', objectPosition: 'top' }} 
                        quality={85}
                        className="transition-transform duration-500 group-hover:scale-105"
                    />
                     <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full p-4">
                        <h3 className="font-semibold text-white">Extras Breviar de Calcul</h3>
                    </div>
                </div>
            </motion.div>

            {/* COLOANA 2: Calculatorul */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }} // Delay-ul este mai mare pentru a apărea după imagini
                viewport={{ once: true }}
            >
                <Card className="shadow-2xl border border-white/20 bg-slate-800/50 backdrop-blur-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white"><Calculator className="w-6 h-6 text-blue-400" />Calculator Diametru Conductă</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Formular */}
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="flow" className="text-slate-300 font-medium">Debitul de gaz (m³/h)</Label>
                                    <div className="relative mt-2">
                                        <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                        <Input id="flow" type="number" placeholder="ex: 50" value={formData.flow} onChange={(e) => setFormData(prev => ({ ...prev, flow: e.target.value }))} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="pressureDrop" className="text-slate-300 font-medium">Cădere de presiune admisă (mbar)</Label>
                                    <div className="relative mt-2">
                                        <Settings className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                        <Input id="pressureDrop" type="number" placeholder="ex: 1" value={formData.pressureDrop} onChange={(e) => setFormData(prev => ({ ...prev, pressureDrop: e.target.value }))} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="length" className="text-slate-300 font-medium">Lungimea conductei (m)</Label>
                                    <div className="relative mt-2">
                                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
                                        <Input id="length" type="number" placeholder="ex: 100" value={formData.length} onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))} className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400" />
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-slate-300 font-medium">Materialul conductei</Label>
                                    <Select value={formData.material} onValueChange={(value) => setFormData(prev => ({ ...prev, material: value }))}>
                                        <SelectTrigger className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400">
                                            <SelectValue placeholder="Selectează materialul" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-white/20 text-white">
                                            {pipeData.map((material) => (
                                                <SelectItem key={material.id} value={material.id} className="cursor-pointer">{material.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleCalculate} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white py-3 text-lg font-semibold" disabled={!formData.flow || !formData.pressureDrop || !formData.length}>
                                    Calculează
                                </Button>
                            </div>
                            {/* Rezultate */}
                            <div className="flex flex-col gap-6">
                                <div className="flex-grow flex flex-col bg-black/20 p-6 rounded-lg border border-white/10">
                                    <h3 className="text-lg font-semibold text-white mb-4">Rezultat Recomandat</h3>
                                    <div className="flex-grow flex items-center justify-center">
                                    {result ? (
                                        <div className="text-center space-y-4 w-full">
                                            <div className="flex items-center justify-center gap-4">
                                                <div>
                                                    <p className="text-slate-400 text-sm">Calculat</p>
                                                    <p className="text-white text-2xl font-semibold">{result.calculatedDiameter.toFixed(2)} mm</p>
                                                </div>
                                                <ChevronsRight className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                                                <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/30">
                                                    <p className="text-cyan-300 text-sm">Recomandat</p>
                                                    <p className="text-cyan-300 text-2xl font-bold">DN {result.recommendedPipe.dn}</p>
                                                    <p className="text-cyan-400 text-xs">(ID: {result.recommendedPipe.id} mm)</p>
                                                </div>
                                            </div>
                                            <div className="border-t border-white/20 pt-4 text-center">
                                                <p className="text-sm text-slate-300">Pentru materialul: <strong className="font-medium text-white">{result.materialName}</strong></p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-slate-400"><Calculator className="w-12 h-12 mx-auto mb-4" /><p>Completează datele și apasă calculează</p></div>
                                    )}
                                    </div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-lg border border-white/10 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                    <h4 className="font-semibold text-white mb-1">Notă Importantă</h4>
                                    <p className="text-sm text-slate-300">Acest calculator folosește formula lui Pole pentru gaze de joasă presiune și oferă o estimare. Consultați un specialist autorizat pentru calcule finale.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
      </div>
    </section>
  );
}