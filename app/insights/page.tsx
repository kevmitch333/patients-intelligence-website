import { ArrowUpRight, BookOpenCheck, Building2, CalendarClock, Download, ExternalLink, Network, ShieldAlert, Scale } from "lucide-react";
import { PageHero, SectionHeading, StatusTag } from "@/components/site-shell";
import { insightItems } from "@/app/data";

export const metadata = { title: "Insights", description: "Evidence-disciplined research, standards updates, and market signals for patient-facing AI and clinical intake." };

export default function Insights() {
  return <main id="main-content"><PageHero eyebrow="Research, standards & market signals" title="Track what changed—and what it does not yet establish." lede="Every update separates evidence type, strength, limitations, implications, and next action. Primary sources carry factual claims; strategic interpretation is labeled as interpretation." status="development" />
    <section className="section"><div className="container insight-feature"><div><BookOpenCheck /><span className="eyebrow">Editorial method</span><h2>Evidence discipline before narrative momentum.</h2></div><div>{["What changed", "Evidence type and strength", "What it establishes—and does not", "Implication for pilot, governance, product, or standard", "Recommended next action", "Published and last-reviewed dates", "Direct source link"].map(x => <p key={x}>{x}</p>)}</div></div></section>
    <section className="section market-signal-section"><div className="container">
      <SectionHeading eyebrow="Market signal · September 23, 2026" title="Consumer health platforms are moving from isolated results toward longitudinal intelligence." copy="That convergence strengthens the case for a neutral layer that can preserve source boundaries and prepare information for accountable clinical review." />
      <article className="market-signal-card">
        <div className="market-signal-lead">
          <span className="evidence-label"><Building2 size={15} aria-hidden="true" /> Company-reported facts</span>
          <h2>A partnerable adjacency with platform-convergence risk.</h2>
          <p>Function currently describes a consumer membership that combines recurring laboratory testing, clinician review, longitudinal tracking, uploaded results, optional imaging, and connections to selected AI tools. The company also describes a broader “Medical Intelligence” direction spanning laboratory data, imaging, wearables, and medical records.</p>
          <div className="market-signal-sources" aria-label="Official Function Health sources">
            <a href="https://www.functionhealth.com/pricing" target="_blank" rel="noreferrer">Pricing & membership <ArrowUpRight size={14} /></a>
            <a href="https://www.functionhealth.com/faq" target="_blank" rel="noreferrer">FAQ & data portability <ArrowUpRight size={14} /></a>
            <a href="https://www.functionhealth.com/article/function-announcement" target="_blank" rel="noreferrer">Company announcement <ArrowUpRight size={14} /></a>
          </div>
        </div>
        <div className="market-signal-decision">
          <span className="evidence-label"><Network size={15} aria-hidden="true" /> Patients Intelligence interpretation</span>
          <dl>
            <div><dt>Partner surface</dt><dd>With patient authorization, Function reports or imaging summaries could enter as one upstream source—without becoming the system of record or the clinical decision maker.</dd></div>
            <div><dt>Threat boundary</dt><dd>Do not compete as a laboratory membership, biomarker dashboard, or general health chatbot. Those categories reward scale and data aggregation more than neutral intake.</dd></div>
            <div><dt>Defensible role</dt><dd>Stay neutral across records, testing platforms, wearables, patient context, and AI systems. Preserve provenance, translate context, and support governed clinical handoff.</dd></div>
          </dl>
          <p className="evidence-note"><ShieldAlert size={17} aria-hidden="true" /><span>Product descriptions above are attributed to Function Health. Partnership fit and competitive risk are Patients Intelligence strategic interpretations—not evidence of an existing relationship.</span></p>
        </div>
      </article>
    </div></section>
    <section className="section insights-list"><div className="container"><SectionHeading eyebrow="Initial evidence radar" title="Three primary-source design inputs." copy="These are not proof that Patients Intelligence works. They are inputs to how the wedge should be governed and tested." /><div>{insightItems.map((item, i) => <article key={item.title}><div className="insight-number">0{i + 1}</div><div><span className="eyebrow">{item.category}</span><h2>{item.title}</h2><div className="insight-meta"><span><BookOpenCheck />{item.strength}</span><span><CalendarClock />Published {item.date}</span><span><Scale />Reviewed {item.reviewed}</span></div><dl><div><dt>What changed</dt><dd>{item.changed}</dd></div><div><dt>What it does not establish</dt><dd>{item.limit}</dd></div><div><dt>Why it matters</dt><dd>{item.implication}</dd></div><div><dt>Next action</dt><dd>{item.action}</dd></div></dl><a href={item.url} target="_blank" rel="noreferrer">Read the primary source <ArrowUpRight size={15} /></a></div></article>)}</div></div></section>
    <section className="section patient-resource-section" id="patient-resources"><div className="container">
      <SectionHeading eyebrow="Patient AI safety resources" title="Practical guidance for the conversation before care." copy="Independent educational resources can help patients use AI more deliberately while preserving the boundary between preparation and medical decision-making." />
      <article className="featured-resource">
        <div className="resource-intro">
          <div className="resource-source"><span>Featured external resource</span><strong>American Medical Association</strong></div>
          <h2>AI Chatbots for Health: How to Use Safely and Effectively</h2>
          <p>The AMA’s one-page guide gives patients five prompt patterns for learning, simplifying medical language, adding context, comparing options, and preparing questions for a clinical visit.</p>
          <div className="resource-actions">
            <a className="button button-primary" href="/resources/ama-ai-chatbots-for-health.pdf" target="_blank" rel="noreferrer">View the AMA guide <ExternalLink size={16} /></a>
            <a className="button button-secondary" href="/resources/ama-ai-chatbots-for-health.pdf" download>Download PDF <Download size={16} /></a>
          </div>
          <small>Published by the American Medical Association, May 2026. © 2026 American Medical Association. Included as third-party educational guidance; no endorsement, sponsorship, or partnership is implied.</small>
        </div>
        <div className="resource-framework" aria-label="How the AMA guide aligns with Patients Intelligence">
          <span className="document-kicker">Why it belongs here</span>
          <h3>Preparation is useful. Clinical judgment remains human.</h3>
          <div className="resource-path">
            <p><span>01</span><strong>Learn</strong><small>Explore and simplify information</small></p>
            <p><span>02</span><strong>Prepare</strong><small>Organize context and questions</small></p>
            <p><span>03</span><strong>Review</strong><small>Bring the conversation to care</small></p>
          </div>
          <div className="resource-guardrail"><ShieldAlert size={20} /><p><strong>Not for emergencies, diagnosis, or treatment decisions.</strong> Avoid sharing identifying details. For serious or sudden symptoms, seek immediate care or call 911.</p></div>
        </div>
      </article>
    </div></section>
    <section className="section research-queue"><div className="container"><SectionHeading eyebrow="Research queue" title="What this evidence surface will continue to examine." /><div>{["Patient-facing AI", "Patient-generated health data and PGI", "Clinical inbox burden", "General vs. specialized medical AI", "Model evaluation and drift", "Health AI assurance", "FHIR and interoperability", "Safety and escalation", "Consent and consumer health data", "Health literacy and equity", "Value-based care and patient experience"].map(x => <span key={x}>{x}</span>)}</div><p><StatusTag status="development" /> No universal model-performance claim, clinical outcome claim, or uncited podcast assertion is presented here.</p></div></section></main>;
}
