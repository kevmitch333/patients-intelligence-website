import { Activity, ArrowDown, ArrowRight, Check, ClipboardCheck, FileText, LockKeyhole, MessageSquareText, Network, ShieldCheck, X } from "lucide-react";
import { CTASection, PageHero, SectionHeading, StatusTag, TrustStrip } from "@/components/site-shell";
import { initiatives } from "@/app/data";

export const metadata = { title: "Platform", description: "Prepare, Intake, the Patient Intelligence Brief, and a neutral path from fragmented health information to governed clinical review." };

const inputs = [
  [FileText, "Health records", "Authorized records, visit notes, and care-plan context"],
  [Activity, "Tests & wearables", "Patient-controlled reports, trends, and device data"],
  [MessageSquareText, "Patient context", "Questions, observations, goals, and AI-assisted material"],
] as const;

const outputs = ["Visit preparation", "Evidence-qualified brief", "Governed clinical handoff", "Follow-up navigation"] as const;

export default function Platform() {
  const layers = [
    { name: "Prepare", audience: "Patient-facing · free literacy and preparation", status: "development" as const, copy: "Restructures material the patient already has into a concise reason for request, stated AI assertions and sources, prioritized questions, and the patient’s goal for the visit.", boundary: "No diagnosis, treatment, or new medical conclusion." },
    { name: "Intake", audience: "Provider-facing · primary enterprise wedge", status: "development" as const, copy: "Receives, separates, labels, profiles, routes, and logs patient-originated AI before it enters the clinician’s normal review workflow.", boundary: "Every consequential classification remains subject to human review." },
    { name: "Vault", audience: "Patient-controlled longitudinal custody", status: "future" as const, copy: "A future permission and custody layer that follows evidence from Intake and requires a separate privacy, security, operational, and governance foundation.", boundary: "The Intake demonstration is not a persistent patient record." },
  ];
  return <main id="main-content"><TrustStrip /><PageHero eyebrow="Platform" title="Three layers. One standard. A disciplined sequence." lede="Build provider-first. Stay patient-first. The enterprise Intake wedge is primary; patient preparation supports it; longitudinal custody remains deliberately deferred." status="development" />
    <section className="section"><div className="container layer-stack">{layers.map((layer, index) => <div key={layer.name} className={`layer-card layer-${index + 1}`}><div className="layer-number">0{index + 1}</div><div><div className="eyebrow-row"><span className="eyebrow">{layer.audience}</span><StatusTag status={layer.status} /></div><h2>{layer.name}</h2><p>{layer.copy}</p><div className="boundary"><ShieldCheck size={18} /><span><strong>Boundary:</strong> {layer.boundary}</span></div></div>{index < 2 && <ArrowDown className="layer-arrow" />}</div>)}</div></section>
    <section className="section neutral-layer-section"><div className="container">
      <SectionHeading eyebrow="Interoperability, not another silo" title="The neutral layer between fragmented health information and accountable human care." copy="Patients should not have to choose one laboratory platform, wearable, record system, or AI assistant as the permanent center of their care story. Patients Intelligence is being designed to preserve source identity while preparing information for governed human review." />
      <div className="neutral-layer-map">
        <div className="neutral-inputs">{inputs.map(([Icon, title, copy]) => <article key={title}><Icon aria-hidden="true" /><div><strong>{title}</strong><p>{copy}</p></div></article>)}</div>
        <ArrowRight className="neutral-map-arrow" aria-hidden="true" />
        <article className="neutral-core"><Network aria-hidden="true" /><span>Neutral orchestration layer</span><h3>Patients Intelligence</h3><p>Preserve provenance. Translate context. Surface uncertainty. Route for review.</p></article>
        <ArrowRight className="neutral-map-arrow" aria-hidden="true" />
        <div className="neutral-outputs">{outputs.map((output, index) => <p key={output}><span>0{index + 1}</span><ClipboardCheck aria-hidden="true" />{output}</p>)}</div>
      </div>
      <p className="neutral-layer-note"><ShieldCheck size={16} aria-hidden="true" /> Product direction—not a claim of current integration, clinical benefit, or institutional deployment.</p>
    </div></section>
    <section className="section intake-architecture"><div className="container"><SectionHeading eyebrow="Intake architecture" title="One enterprise workflow, not a collection of disconnected products." copy="Technical components remain subordinate to a clear job: make a submission inspectable and routable for an authorized clinical team." /><div className="architecture-grid">{["Approved submission intake", "Evidence & provenance", "Evidence-gap representation", "Submission relationship map", "Institution-approved protocols", "Five-dimension PGI profile", "Patient Intelligence Brief", "Clinical verification gateway", "Role-adaptive views", "Workflow analytics & audit"].map((x, i) => <article key={x}><span>{String(i + 1).padStart(2, "0")}</span><strong>{x}</strong></article>)}</div></div></section>
    <section className="section comparison-section"><div className="container"><SectionHeading eyebrow="Category discipline" title="What Patients Intelligence is—and is not." /><div className="is-not-grid"><article><span><Check /> Is</span>{["Clinical AI intake infrastructure", "A trust, translation, orchestration, and verification layer", "A model-neutral submission assurance workflow", "An open-standard strategy with enterprise implementation", "A bounded burden-reduction and communication opportunity"].map(x => <p key={x}><Check size={16} />{x}</p>)}</article><article><span><X /> Is not</span>{["A symptom checker or medical chatbot", "A telehealth provider or EHR replacement", "A pharmacy, marketplace, or advertising network", "A general-purpose model certification lab", "An autonomous clinical decision maker"].map(x => <p key={x}><X size={16} />{x}</p>)}</article></div></div></section>
    <section className="section gated-roadmap"><div className="container"><SectionHeading eyebrow="Product roadmap" title="Future capabilities must earn their place." /><div className="roadmap-grid">{["Clinical Hypothesis Workspace", "Encounter Documentation Assistant", "Coding & Documentation Intelligence", "Care Coordination Workspace", "Extended Medication Intelligence Review"].map(x => <article key={x}><LockKeyhole /><StatusTag status="future" /><h3>{x}</h3></article>)}</div><div className="reentry"><h3>Three readiness requirements</h3><ol><li><span>1</span>Evidence from a bounded intake validation.</li><li><span>2</span>Defined clinical, privacy, security, and regulatory requirements.</li><li><span>3</span>Documented approval through clinical and patient governance.</li></ol></div></div></section>
    <section className="section"><div className="container initiative-ledger"><SectionHeading eyebrow="Platform maturity" title="A clear view of what is demonstrated now and what comes next." /><div>{initiatives.map(item => <article key={item.name}><StatusTag status={item.status} /><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></div></section><CTASection /></main>;
}
