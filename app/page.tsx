import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleDot, FileCheck2, Layers3, SearchCheck, ShieldCheck, UsersRound, X } from "lucide-react";
import { CTASection, SectionHeading, StatusTag } from "@/components/site-shell";
import { RoleBrief } from "@/components/product-interactions";
import { pgiDimensions, pilotPhases, workflow } from "@/app/data";

const audience = [
  ["Health systems", "Measure workload, routing, safety, patient experience, and implementation readiness.", "/pilot"],
  ["Clinicians", "Review a concise, sourced brief instead of an unstructured transcript.", "/how-it-works"],
  ["Patients & advocates", "Have AI-assisted concerns acknowledged in a consistent, understandable form.", "/trust"],
  ["Researchers", "Study an emerging communication behavior with traceable methods.", "/partners"],
  ["Technology partners", "Implement an open structure without surrendering model choice.", "/pgi-standard"],
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="container hero-grid hero-grid-wide">
          <div className="hero-copy">
            <div className="eyebrow-row"><span className="eyebrow">Clinical AI intake infrastructure</span><StatusTag status="development" /></div>
            <h1>Make patient-generated AI legible. <em>Keep clinical judgment human.</em></h1>
            <p className="lede">Patients are bringing AI-assisted questions, summaries, and hypotheses into care. Patients Intelligence turns that material into a structured, evidence-aware brief a clinical team can review—without diagnosing, suppressing, or replacing professional judgment.</p>
            <div className="button-group"><Link className="button button-primary" href="/pilot">Explore a pilot <ArrowRight size={17} /></Link><Link className="button button-secondary" href="/how-it-works">See the workflow</Link></div>
            <Link className="text-link" href="/demo">View the full synthetic demonstration <ArrowRight size={15} /></Link>
            <blockquote>“We do not evaluate the patient. We evaluate the submission.”</blockquote>
          </div>
          <figure className="hero-editorial">
            <Image src="/patients-intelligence-hero-v2.png" alt="A patient and medical professional in conversation as information is organized into a clear brief between them" width={1536} height={1024} priority unoptimized />
            <figcaption><span>Patient voice</span><i /> <span>Evidence-aware brief</span><i /> <strong>Human judgment</strong></figcaption>
            <div className="hero-image-note">AI can help prepare the conversation.<br />Care remains human.</div>
          </figure>
        </div>
        <div className="container audience-switch"><span>See what this means for</span>{audience.map(([name, , href]) => <Link key={name} href={href}>{name}</Link>)}</div>
      </section>

      <section className="section gap-section"><div className="container">
        <SectionHeading eyebrow="The missing layer" title="Patients have a new source of intelligence. Care teams need a safe way to receive it." copy="The problem is not that patients use AI. The problem is that clinical teams have no consistent way to inspect what arrived, distinguish sources from inference, surface gaps, or record what happened next." />
        <div className="before-after"><article><span className="record-label"><X size={15} /> Unstructured today</span><ul>{["Long AI conversations", "Unclear model and source provenance", "Record facts mixed with unsupported claims", "Repeated clarification", "Patient anxiety and clinician cognitive load"].map(x => <li key={x}>{x}</li>)}</ul></article><div className="transform-arrow"><ArrowRight /></div><article><span className="record-label verified"><Check size={15} /> With an intake layer</span><ul>{["Structured reason for request", "Assertion-level evidence labels", "Explicit evidence gaps", "Five-dimension PGI profile", "Role-aware review and logged disposition"].map(x => <li key={x}>{x}</li>)}</ul></article></div>
        <p className="measurement-note">These are intended workflow and measurement targets—not claimed clinical or economic outcomes.</p>
      </div></section>

      <section className="section workflow-preview" id="workflow"><div className="container">
        <SectionHeading eyebrow="Transparent by design" title="From AI output to a reviewable clinical intelligence object." copy="Each stage exposes what changed, what remains unknown, and where human judgment enters." />
        <div className="workflow-steps">{workflow.slice(0, 5).map((item, index) => <article key={item.number}><span>{item.number}</span><i>{index === 0 ? <CircleDot /> : index === 1 ? <SearchCheck /> : index === 2 ? <ShieldCheck /> : index === 3 ? <FileCheck2 /> : <Layers3 />}</i><h3>{item.name}</h3><p>{item.does}</p></article>)}</div>
        <div className="mini-transform"><div className="mini-raw"><span className="document-kicker">Synthetic raw input</span><p>“The AI summarized two routine values, suggested a possible pattern, and listed a medication date…”</p><div><mark data-type="verified">verified</mark><mark data-type="inferred">inferred</mark><mark data-type="unknown">mismatch</mark></div></div><ArrowRight className="mini-arrow" /><div className="mini-brief"><span className="document-kicker">Patient Intelligence Brief</span><h3>Reason for request</h3><p>Discuss a routine trend at the next scheduled visit.</p><h3>Requires human judgment</h3><p>Reconcile the medication date and determine clinical relevance.</p></div></div>
        <div className="center-link"><Link className="button button-secondary" href="/demo">Open the interactive demonstration <ArrowRight size={17} /></Link></div>
      </div></section>

      <section className="section brief-section"><div className="container"><SectionHeading eyebrow="The core output" title="One evidence layer. One reviewable brief. The right emphasis for each role." copy="Changing the view changes ordering, language, and permitted actions—not the underlying facts or source IDs." /><RoleBrief compact /></div></section>

      <section className="section profile-section"><div className="container"><SectionHeading eyebrow="A profile, not a verdict" title="Five dimensions. No single trust score." copy="An aggregate score would invite overreliance. Every dimension stays distinct, qualitative, and inspectable." /><div className="profile-home">{pgiDimensions.map((item, index) => <article key={item.name}><span>0{index + 1}</span><h3>{item.name}</h3><strong>{item.state}</strong><p>{item.detail}</p></article>)}</div></div></section>

      <section className="section audience-section"><div className="container"><SectionHeading eyebrow="A whole-system problem" title="Designed for the whole care relationship." /><div className="audience-grid">{audience.map(([name, copy, href]) => <Link href={href} key={name}><UsersRound size={21} /><h3>{name}</h3><p>{copy}</p><span>Follow this path <ArrowRight size={15} /></span></Link>)}</div></div></section>

      <section className="section pilot-home"><div className="container split-heading"><SectionHeading eyebrow="Pilot pathway" title="Start with a bounded workflow study." copy="The first proof is not whether a model can produce impressive medical language. It is whether a co-designed intake process can reduce avoidable review burden while preserving safety, patient voice, and clinician authority." /><Link href="/pilot" className="button button-primary">View pilot design <ArrowRight size={17} /></Link></div><div className="container phase-grid">{pilotPhases.map((item) => <article key={item.phase}><div><span className="phase-number">{item.phase}</span><StatusTag status={item.status} /></div><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div></section>

      <section className="section dark-section"><div className="container neutral-grid"><div><span className="eyebrow">Model-neutral assurance</span><h2>The question is not “Which model is best?”</h2><p className="dark-lede">It is: “What can this team responsibly trust in this submission, right now?”</p></div><div className="neutral-points"><p>Models, versions, prompts, inputs, and performance change.</p><p>Model-level benchmarks cannot replace per-submission provenance.</p><p>Upstream assurance and downstream artifact review are complementary.</p><p>The PGI Standard is being designed to work across models and systems.</p></div></div></section>

      <section className="section standard-home"><div className="container standard-grid"><div><div className="eyebrow-row"><span className="eyebrow">Open infrastructure</span><StatusTag status="draft" /></div><h2>Build the protocol before the category hardens without one.</h2><p>The PGI Standard is intended to define minimum provenance, evidence labeling, urgency handling, acknowledgment, routing, human-review, and audit metadata for patient-generated intelligence.</p><div className="button-group"><Link className="button button-primary" href="/pgi-standard">Review the PGI framework</Link><Link className="button button-secondary" href="/partners#founding-100">Join the Founding 100</Link></div></div><div className="standard-record"><span className="document-kicker">PGI Standard / v0.9 working model</span>{["Provenance", "Assertion boundaries", "Evidence classes", "Human review", "Disposition events", "Audit history"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><small>{i < 2 ? "Required metadata" : "Open for review"}</small></div>)}</div></div></section>

      <section className="section trust-home"><div className="container"><SectionHeading eyebrow="Trust architecture" title="Safety is product architecture, not a disclaimer." /><div className="trust-grid">{[["Clinician primacy", "No diagnosis, treatment, code, or disposition is finalized."], ["Never suppress", "Accepted submissions remain visible to the designated clinical workflow."], ["Visible uncertainty", "Sources, contradictions, unknowns, and evidence gaps stay inspectable."], ["Data minimization", "Pseudonymity is used accurately; public forms collect no health data."], ["Complete auditability", "Transformations, acknowledgments, edits, and dispositions are recorded."], ["Patient & equity governance", "Lower digital literacy never means lower access to attention."]].map(([t, c]) => <article key={t}><ShieldCheck size={20} /><h3>{t}</h3><p>{c}</p></article>)}</div><div className="center-link"><Link href="/trust" className="text-link">Inspect the governance model <ArrowRight size={15} /></Link></div></div></section>
      <CTASection />
    </main>
  );
}
