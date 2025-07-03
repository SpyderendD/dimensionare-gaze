import "./globals.css";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GazDimension - Dimensionare Sisteme Gaze Naturale",
  description: "Soluții profesionale pentru dimensionarea rețelelor de distribuție gaze naturale cu presiune redusă și medie. Sutac Ionel - specialist autorizat.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
        <body className={inter.className}>
          {children}
          <SpeedInsights/>
          <Toaster />
        </body>
    </html>
  );
}