import { DemoExperience } from "@/components/product-interactions";
import { PageHero, SafetyNotice, TrustStrip } from "@/components/site-shell";

export const metadata = { title: "Synthetic Product Demonstration", description: "See a synthetic patient-originated AI submission become an inspectable Patient Intelligence Brief." };

export default function DemoPage() {
  return <main id="main-content"><TrustStrip /><PageHero eyebrow="Synthetic product demonstration" title="See a patient-originated AI submission become a Patient Intelligence Brief." lede="Follow a fictional, low-risk outpatient example through provenance capture, evidence classification, a five-part profile, role-adaptive views, human disposition, and audit history." status="development" dark /><section className="section demo-page"><div className="container"><SafetyNotice /><DemoExperience /></div></section></main>;
}
