import Link from "next/link";
import { ArrowRight, Building2, FlaskConical, HeartHandshake, Laptop2, Stethoscope, UsersRound } from "lucide-react";
import { CTASection, PageHero, SectionHeading, StatusTag } from "@/components/site-shell";
import { founding100 } from "@/app/data";

export const metadata = { title: "Partners & Founding 100", description: "Bounded collaboration paths for health systems, clinicians, patients, researchers, technology partners, and funders." };

const tracks = [
  [Building2, "Health systems & practices", "Co-design a bounded workflow study, current-state burden measures, safety gates, and procurement criteria.", "Explore a pilot"],
  [Stethoscope, "Clinicians", "Join a design interview, review synthetic briefs, and help author a practical evidence vocabulary.", "Join the cohort"],
  [HeartHandshake, "Patients & advocates", "Review language, consent, correction, appeals, accessibility, and what it means to feel heard.", "Shape governance"],
  [FlaskConical, "Researchers & universities", "Co-design validation, informatics, health-services research, ethics, safety, and equity methods.", "Collaborate on research"],
  [Laptop2, "Technology partners", "Map PGI to portals, EHRs, FHIR, provenance, identity, audit, and model-observability infrastructure.", "Discuss integration"],
  [UsersRound, "Foundations, public agencies & funders", "Support non-dilutive validation, standards development, patient participation, and burden-reduction research.", "Fund evidence"],
] as const;

export default function Partners() {
  return <main id="main-content"><PageHero eyebrow="Partners" title="Help build the intake standard patient-generated AI now requires." lede="Choose a specific contribution: one bounded study, one implementation perspective, one research method, or one governance responsibility." />
    <section className="section"><div className="container partner-grid">{tracks.map(([Icon, title, copy, ask]) => <article key={title}><Icon /><h2>{title}</h2><p>{copy}</p><Link href={`/contact?path=${encodeURIComponent(ask)}`}>{ask} <ArrowRight size={15} /></Link></article>)}</div></section>
    <section className="section founding-section" id="founding-100"><div className="container"><div className="eyebrow-row"><span className="eyebrow">Founding 100</span><StatusTag status="forming" /></div><SectionHeading title="A recruited working cohort—not a mailing list." copy="The intended cohort brings clinical, patient, research, and institutional authority into the standard before software claims outrun evidence." /><div className="founding-grid">{founding100.map(item => <article key={item.label}><strong>{item.count}</strong><h3>{item.label}</h3><p>{item.contribution}</p></article>)}</div><div className="cohort-exchange"><div><h3>Participants contribute</h3><p>Time, critique, implementation context, conflicts disclosure, and accountable review of working materials.</p></div><div><h3>The process is intended to provide</h3><p>Documented participation, early working-session access, and a meaningful role in shaping the draft—subject to final governance terms.</p></div></div><Link className="button button-primary" href="/contact?path=founding-100">Apply to participate <ArrowRight size={17} /></Link></div></section>
    <section className="section investor-note"><div className="container"><span className="eyebrow">Strategic capital</span><h2>The commercial wedge is enterprise Intake. The defensibility path is evidence + standard + institutional trust.</h2><p>Strategic investor conversations may address the staged roadmap and validation path. This site contains no securities terms and is not an investment solicitation.</p></div></section><CTASection /></main>;
}
