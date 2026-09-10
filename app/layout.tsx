import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://patients-intelligence.kevmitch333.chatgpt.site"),
  title: { default: "Patients Intelligence | Clinical AI Intake Infrastructure", template: "%s | Patients Intelligence" },
  description: "Patients Intelligence turns patient-originated AI into structured, evidence-aware briefs for clinical review—while keeping judgment human, workflows auditable, and patient voice intact.",
  alternates: { canonical: "https://patientsintelligence.com" },
  openGraph: { title: "Patients Intelligence | Clinical AI Intake Infrastructure", description: "Make patient-generated AI legible. Keep clinical judgment human.", type: "website", siteName: "Patients Intelligence" },
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
