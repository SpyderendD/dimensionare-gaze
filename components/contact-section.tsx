"use client";

import { useState, MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, User, MessageSquare, CheckCircle, XCircle, Upload, FileText, X } from "lucide-react";
import { toast } from "sonner";

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: string;
}

export default function ContactSection() {
  // Hook-uri pentru animația de lumină
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  // Starea pentru formular
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Funcțiile de logică pentru formular (neschimbate)
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowedTypes = [ 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg' ];
    const maxSize = 10 * 1024 * 1024;
    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) { toast.error(`Tipul fișierului ${file.name} nu este permis.`); return; }
      if (file.size > maxSize) { toast.error(`Fișierul ${file.name} este prea mare. Maxim 10MB.`); return; }
      if (uploadedFiles.length < 5) {
        setUploadedFiles(prev => [...prev, { file, name: file.name, size: formatFileSize(file.size), type: file.type }]);
        toast.success(`Fișier adăugat: ${file.name}`);
      } else { toast.error("Maximum 5 fișiere permise"); }
    });
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const fileName = uploadedFiles[index].name;
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.success(`Fișier eliminat: ${fileName}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) { toast.error("Completați email și mesajul"); return; }
    setIsSubmitting(true); setSubmitStatus('idle');
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      uploadedFiles.forEach((uploadedFile, index) => { formDataToSend.append(`file_${index}`, uploadedFile.file); });
      const response = await fetch('/api/contact', { method: 'POST', body: formDataToSend });
      if (response.ok) {
        setSubmitStatus('success'); setFormData({ email: '', message: '' }); setUploadedFiles([]);
        toast.success("Mesajul a fost trimis cu succes!");
      } else { setSubmitStatus('error'); toast.error("Eroare la trimiterea mesajului"); }
    } catch (error) { setSubmitStatus('error'); toast.error("Eroare la trimiterea mesajului");
    } finally { setIsSubmitting(false); }
  };

  return (
    // Părintele principal, care activează animația la mișcarea mouse-ului
    <section 
      id="contact" 
      onMouseMove={handleMouseMove}
      className="relative py-20 overflow-hidden"
    >
      {/* STRATUL 1: Fundalul absolut, care acoperă tot */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      
      {/* STRATUL 2: Modelul de rețea, deasupra fundalului */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="network-contact" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#3b82f6" opacity="0.5"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" /></circle>
              <circle cx="80" cy="60" r="1.5" fill="#60a5fa" opacity="0.4"><animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" /></circle>
              <line x1="20" y1="20" x2="80" y2="60" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3"><animate attributeName="opacity" values="0.1;0.5;0.1" dur="5s" repeatCount="indefinite" /></line>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network-contact)" />
        </svg>
      </div>

      {/* STRATUL 3: Lumina dinamică, deasupra modelului de rețea */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* STRATUL 4: Conținutul principal (titlu și formular), care stă deasupra tuturor */}
      <div className="relative z-0 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Trimiteți cererea pentru dimensionarea sistemului de gaze naturale
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                {/* Formularul propriu-zis rămâne complet neschimbat */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white font-medium">Email *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                        <Input id="email" type="email" placeholder="email@exemplu.com" className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><span className="text-white font-bold">SI</span></div>
                      <div><p className="text-white font-medium">0749 920 392</p></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white font-medium">Descrierea proiectului *</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                      <Textarea id="message" placeholder="Descrieți proiectul: tip consumatori, presiuni necesare, dimensiuni, cerințe specifice..." className="pl-10 pt-10 min-h-[120px] resize-none bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400" value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label className="text-white font-medium">Atașamente (PDF, Word, PNG, JPG) - Max 5 fișiere, 10MB fiecare</Label>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-blue-400" />
                          <p className="mb-2 text-sm text-white font-medium">Click pentru a selecta fișiere</p>
                          <p className="text-xs text-slate-400">PDF, DOC, DOCX, PNG, JPG</p>
                        </div>
                        <input id="file-upload" type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileUpload} />
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-white text-sm font-medium">Fișiere atașate:</p>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <div>
                                <p className="text-white text-sm font-medium">{file.name}</p>
                                <p className="text-slate-400 text-xs">{file.size}</p>
                              </div>
                            </div>
                            <button type="button" onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"><X className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed rounded-xl" disabled={isSubmitting || !formData.email || !formData.message}>
                    {isSubmitting ? (<div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Se trimite...</div>) : (<div className="flex items-center gap-2"><Send className="w-5 h-5" />Trimite Cererea</div>)}
                  </Button>
                  {submitStatus === 'success' && (<div className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-green-300"><CheckCircle className="w-5 h-5" /><span className="text-sm">Cererea a fost trimisă cu succes!</span></div>)}
                  {submitStatus === 'error' && (<div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300"><XCircle className="w-5 h-5" /><span className="text-sm">Eroare la trimiterea cererii.</span></div>)}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}