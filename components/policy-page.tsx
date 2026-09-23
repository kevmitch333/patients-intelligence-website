import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/site-shell";

export function PolicyPage({ title, lede, sections }: { title: string; lede: string; sections: Array<[string, string]> }) {
  return <main id="main-content"><PageHero eyebrow="Policy & accountability" title={title} lede={lede} /><section className="section"><div className="container policy-layout"><aside><Link href="/trust"><ArrowLeft size={15} /> Return to Trust & Governance</Link></aside><div className="policy-content">{sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div></div></section></main>;
}
