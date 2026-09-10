import Link from "next/link";
import { ArrowRight, Braces, Clock3, FileText, Users } from "lucide-react";
import { CTASection, PageHero, SectionHeading, StatusTag, TrustStrip } from "@/components/site-shell";
import { evidenceClasses, glossary, pgiDimensions } from "@/app/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = { title: "PGI Standard", description: "A draft shared structure for patient-generated intelligence, provenance, evidence labels, routing, and human review." };

const jsonConcept = `{
  "specification": "PGI v0.9 working concept",
  "status": "draft",
  "submission": {
    "synthetic_id": "PGI-DEMO-001",
    "model_family": "general_ai_assistant",
    "model_version": null,
    "source_ids": ["S-01", "S-02", "S-03"],
    "assertions": [
      { "id": "A-01", "class": "verified", "source": "S-01" },
      { "id": "A-03", "class": "inferred", "source": "S-03" }
    ],
    "human_review_required": true
  }
}`;

export default function PGIStandard() {
  return <main id="main-content"><TrustStrip /><PageHero eyebrow="PGI Standard" title="A shared structure for patient-generated intelligence." lede="Patient-Generated Intelligence (PGI) is clinical analysis, synthesis, or interpretation produced by an AI system at a patient’s direction using patient-provided symptoms, records, device data, reports, questions, or cited sources as input." status="draft"><div className="button-group"><Link className="button button-primary" href="/contact?path=standard">Request the working draft <ArrowRight size={17} /></Link><Link className="button button-secondary" href="/partners#founding-100">Join the review cohort</Link></div></PageHero>
    <section className="section"><div className="container"><SectionHeading eyebrow="Minimum structure" title="What the working framework is intended to define." /><div className="architecture-grid standard-items">{["Submission metadata", "Model and version provenance", "Input and source provenance", "Assertion boundaries", "Evidence classification", "Evidence-gap representation", "Five-dimension PGI profile", "Urgency-signal handling", "Acknowledgment and routing", "Human-review events", "Audit history", "Accessibility requirements", "Interoperability mapping"].map((x, i) => <article key={x}><span>{String(i + 1).padStart(2, "0")}</span><strong>{x}</strong></article>)}</div></div></section>
    <section className="section evidence-vocabulary"><div className="container"><SectionHeading eyebrow="Evidence vocabulary" title="Six classes that remain inspectable." copy="Each label describes the source status of an assertion. No label decides the patient’s credibility, severity, or worthiness of attention." /><div className="evidence-class-grid">{evidenceClasses.map((item) => <article key={item.key} className={`evidence-card evidence-${item.key}`}><span>{item.label}</span><h3>{item.source}</h3><p>{item.definition}</p></article>)}</div></div></section>
    <section className="section schema-section"><div className="container"><div className="eyebrow-row"><span className="eyebrow">Interactive sample schema</span><StatusTag status="draft" /></div><Tabs defaultValue="human" className="schema-viewer"><TabsList><TabsTrigger value="human"><FileText /> Human-readable</TabsTrigger><TabsTrigger value="json"><Braces /> JSON concept</TabsTrigger><TabsTrigger value="events"><Clock3 /> Event history</TabsTrigger></TabsList><TabsContent value="human"><div className="schema-human"><div><span>submission.synthetic_id</span><strong>PGI-DEMO-001</strong><small>Non-identifying demonstration ID</small></div><div><span>provenance.model_version</span><strong>Not available</strong><small>Unknown remains explicit</small></div><div><span>assertion.A-01.class</span><strong>Verified</strong><small>Source S-01</small></div><div><span>review.required</span><strong>True</strong><small>All consequential decisions remain human</small></div></div></TabsContent><TabsContent value="json"><pre><code>{jsonConcept}</code></pre><p className="schema-note">Conceptual only. This is not a finalized or downloadable specification.</p></TabsContent><TabsContent value="events"><ol className="schema-events">{["09:00 · Submission received", "09:01 · Provenance captured", "09:02 · Assertions separated", "09:03 · Evidence labels reviewed", "09:05 · Brief viewed", "09:07 · Human disposition logged"].map(x => <li key={x}>{x}</li>)}</ol></TabsContent></Tabs></div></section>
    <section className="section profile-section"><div className="container"><SectionHeading eyebrow="No single trust score" title="Five dimensions reveal different failure modes." /><div className="profile-home">{pgiDimensions.map((item, i) => <article key={item.name}><span>0{i + 1}</span><h3>{item.name}</h3><strong>{item.state}</strong><p>{item.failure}</p></article>)}</div></div></section>
    <section className="section"><div className="container participation"><SectionHeading eyebrow="Open participation" title="The draft needs implementation, clinical, patient, research, and governance perspectives." /><div>{[[FileText, "Review the draft framework", "Test definitions, minimum fields, and failure states."], [Braces, "Contribute an implementation perspective", "Map the concept to portals, FHIR, provenance, and audit infrastructure."], [Clock3, "Submit a research question", "Strengthen validation, safety, burden, and equity methods."], [Users, "Join the Founding 100", "Help establish accountable, multi-stakeholder stewardship."]].map(([Icon, title, copy]) => { const I = Icon as typeof FileText; return <article key={String(title)}><I /><h3>{String(title)}</h3><p>{String(copy)}</p><Link href="/contact?path=standard">Start this conversation <ArrowRight size={15} /></Link></article>; })}</div></div></section>
    <section className="section glossary-section"><div className="container"><SectionHeading eyebrow="Working glossary" title="Technical precision, plain-language explanations." /><dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></div></section><CTASection title="Help define a protocol the category can share." copy="The PGI Standard is a draft working framework. It is not claimed as adopted, finalized, or endorsed." /></main>;
}
