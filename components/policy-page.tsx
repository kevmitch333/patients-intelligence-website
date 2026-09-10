import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { PageHero, StatusTag } from "@/components/site-shell";

export function PolicyPage({ title, lede, sections, counsel = true }: { title: string; lede: string; sections: Array<[string, string]>; counsel?: boolean }) {
  return <main id="main-content"><PageHero eyebrow="Policy & accountability" title={title} lede={lede} status="draft" /><section className="section"><div className="container policy-layout"><aside><StatusTag status="draft" />{counsel && <div className="draft-warning"><AlertTriangle /><p><strong>Draft for counsel review.</strong> This page provides product and policy structure, not final legal terms.</p></div>}<Link href="/trust"><ArrowLeft size={15} /> Return to Trust & Governance</Link></aside><div className="policy-content">{sections.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div></div></section></main>;
}
