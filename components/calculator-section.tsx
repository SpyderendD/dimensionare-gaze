"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Gauge, Ruler, Settings } from "lucide-react";

export default function CalculatorSection() {
  console.log("CalculatorSection component rendered");
  
  const [formData, setFormData] = useState({
    flow: '',
    pressure: '',
    material: '',
    length: '',
    temperature: '15'
  });
  
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    console.log("Calculate button clicked with data:", formData);
    
    // Simplified calculation for gas pipe diameter
    const flow = parseFloat(formData.flow);
    const pressure = parseFloat(formData.pressure);
    const length = parseFloat(formData.length);
    
    if (flow && pressure && length) {
      // Basic formula for natural gas pipe sizing (simplified)
      const diameter = Math.sqrt((flow * length * 1000) / (pressure * 1000));
      const result = Math.round(diameter * 10) / 10;
      
      console.log("Calculation result:", result);
      setResult(result);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-white to-gas-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gas-blue-900 mb-4">
            Calculator Dimensionare
          </h2>
          <p className="text-lg text-gas-blue-700 max-w-2xl mx-auto">
            Calculează diametrul optim pentru conducte de gaze naturale
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gas-blue-600 to-water-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-6 h-6" />
                Calculator Diametru Conductă
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="flow" className="text-gas-blue-900 font-medium">
                      Debitul de gaz (m³/h)
                    </Label>
                    <div className="relative">
                      <Gauge className="absolute left-3 top-3 w-4 h-4 text-gas-blue-500" />
                      <Input
                        id="flow"
                        type="number"
                        placeholder="ex: 50"
                        className="pl-10"
                        value={formData.flow}
                        onChange={(e) => {
                          console.log("Flow input changed:", e.target.value);
                          setFormData(prev => ({ ...prev, flow: e.target.value }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressure" className="text-gas-blue-900 font-medium">
                      Presiunea de lucru (mbar)
                    </Label>
                    <div className="relative">
                      <Settings className="absolute left-3 top-3 w-4 h-4 text-gas-blue-500" />
                      <Input
                        id="pressure"
                        type="number"
                        placeholder="ex: 20"
                        className="pl-10"
                        value={formData.pressure}
                        onChange={(e) => {
                          console.log("Pressure input changed:", e.target.value);
                          setFormData(prev => ({ ...prev, pressure: e.target.value }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length" className="text-gas-blue-900 font-medium">
                      Lungimea conductei (m)
                    </Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-3 w-4 h-4 text-gas-blue-500" />
                      <Input
                        id="length"
                        type="number"
                        placeholder="ex: 100"
                        className="pl-10"
                        value={formData.length}
                        onChange={(e) => {
                          console.log("Length input changed:", e.target.value);
                          setFormData(prev => ({ ...prev, length: e.target.value }));
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gas-blue-900 font-medium">Materialul conductei</Label>
                    <Select value={formData.material} onValueChange={(value) => {
                      console.log("Material selected:", value);
                      setFormData(prev => ({ ...prev, material: value }));
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează materialul" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="steel">Oțel</SelectItem>
                        <SelectItem value="pe">Polietilenă (PE)</SelectItem>
                        <SelectItem value="pvc">PVC</SelectItem>
                        <SelectItem value="copper">Cupru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleCalculate}
                    className="w-full bg-gradient-to-r from-gas-blue-600 to-water-blue-600 hover:from-gas-blue-700 hover:to-water-blue-700 text-white py-3 text-lg font-semibold"
                    disabled={!formData.flow || !formData.pressure || !formData.length}
                  >
                    Calculează Diametrul
                  </Button>
                </div>

                {/* Results */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gas-blue-50 to-water-blue-50 p-6 rounded-lg border border-gas-blue-200">
                    <h3 className="text-lg font-semibold text-gas-blue-900 mb-4">Rezultatul Calculului</h3>
                    
                    {result !== null ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gas-blue-600 mb-2">
                            {result} mm
                          </div>
                          <p className="text-gas-blue-700">Diametru minim recomandat</p>
                        </div>
                        
                        <div className="border-t border-gas-blue-200 pt-4 space-y-2">
                          <p className="text-sm text-gas-blue-600">
                            <strong>Debit:</strong> {formData.flow} m³/h
                          </p>
                          <p className="text-sm text-gas-blue-600">
                            <strong>Presiune:</strong> {formData.pressure} mbar
                          </p>
                          <p className="text-sm text-gas-blue-600">
                            <strong>Lungime:</strong> {formData.length} m
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calculator className="w-12 h-12 text-gas-blue-300 mx-auto mb-4" />
                        <p className="text-gas-blue-500">
                          Completează datele pentru a vedea rezultatul
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="bg-water-blue-50 p-4 rounded-lg border border-water-blue-200">
                    <h4 className="font-semibold text-water-blue-900 mb-2">Notă Importantă</h4>
                    <p className="text-sm text-water-blue-700">
                      Acest calculator oferă o estimare preliminară. Pentru proiecte complexe, 
                      consultați întotdeauna standardele în vigoare și un specialist autorizat.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}