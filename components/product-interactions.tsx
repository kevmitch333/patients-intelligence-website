"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowRight, Check, ClipboardCheck, FileSearch, History, Info, Route, ShieldCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { evidenceClasses, briefSections, pgiDimensions, roles, workflow } from "@/app/data";

export function RoleBrief({ compact = false }: { compact?: boolean }) {
  return (
    <Tabs defaultValue="Physician" className="role-brief">
      <div className="tab-scroller" aria-label="Role-adaptive Patient Intelligence Brief views">
        <TabsList className="role-tabs" variant="line">
          {Object.keys(roles).map((role) => <TabsTrigger key={role} value={role}>{role}</TabsTrigger>)}
        </TabsList>
      </div>
      {Object.entries(roles).map(([role, view]) => (
        <TabsContent key={role} value={role} className="role-panel">
          <div className="role-panel-head"><div><span className="document-kicker">Patient Intelligence Brief / {role} view</span><h3>One evidence layer. Role-specific emphasis.</h3></div><span className="version-stamp">PIB · v0.9</span></div>
          <p>{view.intro}</p>
          <ol className="brief-order">{view.order.slice(0, compact ? 4 : 5).map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<small>{index < 3 ? `[S-0${index + 1}]` : "HUMAN REVIEW"}</small></li>)}</ol>
          <div className="role-action"><ShieldCheck size={17} /><span><strong>Permitted action:</strong> {view.action}</span></div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

const assertions = [
  { id: "A-01", text: "Two routine values were copied from the synthetic record.", type: "verified", detail: "The values and collection dates match Source S-01, a fictional authorized record extract.", path: "Raw excerpt → field match → Verified", gap: "None in this synthetic field match." },
  { id: "A-02", text: "The fictional patient wants the trend discussed at a routine visit.", type: "reported", detail: "This intent is stated by the fictional patient and is not independently verified.", path: "Patient statement → Reported", gap: "The clinical reason remains for human review." },
  { id: "A-03", text: "The pattern may merit discussion with the care team.", type: "inferred", detail: "This phrasing comes from the source AI. It is preserved as an observation, not promoted to clinical fact.", path: "Source AI output → assertion boundary → Inferred", gap: "No examination, complete trend history, or clinical interpretation is available." },
  { id: "A-04", text: "A general clinical reference describes factors that can affect this kind of value.", type: "external", detail: "A fictional external reference was named, but applicability to this case is not established.", path: "Cited reference → External", gap: "Human review is required to determine relevance." },
  { id: "A-05", text: "The source AI did not identify its exact model version.", type: "unknown", detail: "Model family is stated; model version is unavailable. The system does not guess.", path: "Provenance field → unavailable → Unknown", gap: "Exact model version and full prompt history are missing." },
  { id: "A-06", text: "Medication start date is listed as March 8.", type: "derived", detail: "The submitted summary says March 8; the synthetic record extract says March 18. This is a record-fidelity mismatch.", path: "Submission field → record comparison → Mismatch", gap: "A human must reconcile the correct date." },
] as const;

export function DemoExperience({ embedded = false }: { embedded?: boolean }) {
  const [selected, setSelected] = useState(assertions[0]);
  const [stage, setStage] = useState(0);
  const [disposition, setDisposition] = useState("Routine review queued");
  const evidence = evidenceClasses.find((item) => item.key === selected.type)!;
  const audit = useMemo(() => [
    ["09:00", "Submission received"], ["09:01", "Provenance captured"], ["09:02", "Assertions classified"],
    ["09:03", "Human review requested"], ["09:05", "Brief viewed"], ["09:07", disposition],
  ], [disposition]);
  return (
    <div className={`demo-shell ${embedded ? "demo-embedded" : ""}`}>
      <div className="demo-banner"><span>Synthetic example — no real patient data</span><span>Demonstration only — not for clinical use</span><span>No diagnosis or treatment is generated</span></div>
      <div className="demo-stage-nav" role="tablist" aria-label="Demonstration stages">
        {["Raw submission", "Evidence", "PGI profile", "Brief", "Disposition", "Audit"].map((label, index) => (
          <button key={label} role="tab" aria-selected={stage === index} onClick={() => setStage(index)}><span>{index + 1}</span>{label}</button>
        ))}
      </div>
      <div className="demo-workspace">
        {stage === 0 && <section className="demo-panel raw-panel" aria-labelledby="raw-title">
          <div className="panel-title"><div><span className="document-kicker">PGI submission / synthetic</span><h2 id="raw-title">AI-assisted summary</h2></div><span className="version-stamp">Received 09:00</span></div>
          <div className="provenance-row"><span><b>Model</b> General AI assistant</span><span><b>Version</b> Not provided</span><span><b>Date</b> 2026-09-04</span><span><b>Stated inputs</b> Lab summary, medication list, patient notes</span></div>
          <p className="raw-copy">“I asked an AI assistant to organize questions about two routine lab values. It copied the values from my summary <mark data-type="verified">accurately</mark>. I want to <mark data-type="reported">discuss the trend at my next visit</mark>. The assistant said the pattern <mark data-type="inferred">may merit discussion</mark> and referenced <mark data-type="external">a general clinical resource</mark>. It did not provide an <mark data-type="unknown">exact model version</mark>. It listed a medication start date of <mark data-type="derived">March 8</mark>, while the synthetic record says March 18.”</p>
          <div className="input-list"><span>Source S-01 · synthetic record extract</span><span>Source S-02 · fictional patient note</span><span>Source S-03 · source AI conversation excerpt</span></div>
          <button className="button button-primary" onClick={() => setStage(1)}>Inspect evidence <ArrowRight size={17} /></button>
        </section>}
        {stage === 1 && <section className="demo-panel" aria-labelledby="evidence-title">
          <div className="panel-title"><div><span className="document-kicker">Assertion-level inspection</span><h2 id="evidence-title">Evidence transformation</h2></div><span className="version-stamp">6 assertions</span></div>
          <div className="evidence-layout">
            <div className="assertion-list" role="listbox" aria-label="Synthetic assertions">
              {assertions.map((item) => <button key={item.id} role="option" aria-selected={selected.id === item.id} onClick={() => setSelected(item)} className={`assertion assertion-${item.type}`}><span>{item.id}</span><strong>{evidenceClasses.find((e) => e.key === item.type)?.label}</strong><p>{item.text}</p></button>)}
            </div>
            <aside className="inspector" aria-live="polite">
              <span className={`evidence-chip evidence-${selected.type}`}>{evidence.label}</span><h3>{selected.id} · Inspection</h3><p>{selected.detail}</p>
              <dl><div><dt>Source category</dt><dd>{evidence.source}</dd></div><div><dt>Transformation path</dt><dd>{selected.path}</dd></div><div><dt>Evidence gap</dt><dd>{selected.gap}</dd></div></dl>
              <div className="routine-state"><Info size={17} /><span><strong>No urgency determination</strong>Routine human review</span></div>
            </aside>
          </div>
        </section>}
        {stage === 2 && <section className="demo-panel" aria-labelledby="profile-title"><div className="panel-title"><div><span className="document-kicker">A profile, not a verdict</span><h2 id="profile-title">PGI quality profile</h2></div><span className="version-stamp">No overall score</span></div><p className="panel-lede">Each dimension stays separate so a reviewer can inspect what it means and what can fail.</p><div className="profile-grid">{pgiDimensions.map((item, i) => <article key={item.name} className="profile-card"><span>0{i + 1}</span><h3>{item.name}</h3><strong>{item.state}</strong><p>{item.detail}</p><details><summary>Failure mode</summary><p>{item.failure}</p></details></article>)}</div></section>}
        {stage === 3 && <section className="demo-panel" aria-labelledby="brief-title"><div className="panel-title"><div><span className="document-kicker">Structured output artifact</span><h2 id="brief-title">Patient Intelligence Brief</h2></div><span className="version-stamp">PIB · synthetic</span></div><div className="brief-demo-grid"><div className="brief-sections">{briefSections.map(([title, copy], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><RoleBrief compact /></div></section>}
        {stage === 4 && <section className="demo-panel" aria-labelledby="disposition-title"><div className="panel-title"><div><span className="document-kicker">Human workflow only</span><h2 id="disposition-title">Record a disposition</h2></div><span className="version-stamp">Requires authorized reviewer</span></div><div className="disposition-grid"><div className="disposition-options">{["Acknowledge submission", "Request non-clinical clarification", "Route for routine review", "Flag for prompt human review", "Document disposition"].map((action) => <button key={action} onClick={() => setDisposition(action)} className={disposition === action ? "selected" : ""}><ClipboardCheck size={19} /><span>{action}<small>Human confirmation required</small></span>{disposition === action && <Check size={18} />}</button>)}</div><aside className="inspector"><span className="evidence-chip evidence-verified">Human selected</span><h3>{disposition}</h3><p>This demonstration records a workflow action. It does not approve a diagnosis, start treatment, dismiss a submission, or submit a code.</p><button className="button button-primary" onClick={() => setStage(5)}>View audit trail <History size={17} /></button></aside></div></section>}
        {stage === 5 && <section className="demo-panel" aria-labelledby="audit-title"><div className="panel-title"><div><span className="document-kicker">Immutable-style event history / synthetic</span><h2 id="audit-title">Audit timeline</h2></div><span className="version-stamp">6 events</span></div><ol className="audit-timeline">{audit.map(([time, event], index) => <li key={`${time}-${event}`}><span className="audit-icon">{index < 3 ? <FileSearch size={17} /> : index < 5 ? <ShieldCheck size={17} /> : <Route size={17} />}</span><time>{time}</time><strong>{event}</strong><small>{index === 5 ? "Selected in this demo session" : "Transformation preserved"}</small></li>)}</ol><div className="demo-boundary"><AlertCircle size={19} /><p><strong>What is absent by design:</strong> no upload, free-text clinical input, EHR connection, diagnosis, treatment, autonomous code, or patient record retention.</p></div></section>}
      </div>
    </div>
  );
}

export function WorkflowAccordion() {
  return <Accordion type="single" collapsible className="workflow-accordion">{workflow.map((item) => <AccordionItem value={item.number} key={item.number}><AccordionTrigger><span className="workflow-trigger"><b>{item.number}</b><span><small>{item.name}</small>{item.title}</span></span></AccordionTrigger><AccordionContent><div className="workflow-detail"><div><span>System does</span><p>{item.does}</p></div><div><span>System does not</span><p>{item.not}</p></div><div><span>Human approves</span><p>{item.human}</p></div><div><span>Audit records</span><p>{item.logged}</p></div></div></AccordionContent></AccordionItem>)}</Accordion>;
}

export const trustFaqs = [
  ["Does this diagnose?", "No. It structures and assesses a submission so a qualified professional can independently review its basis."],
  ["Can a submission be hidden?", "No. Under the never-suppress rule, accepted submissions remain visible to the designated clinical workflow."],
  ["What happens when the model is unknown?", "Unknown is recorded as a valid provenance state. The system does not infer a model or version."],
  ["Does the system retain patient records?", "The current Intake wedge is not a longitudinal record repository. Future custody capabilities are gated and deferred."],
  ["Who approves urgency routing?", "Institution-approved protocols and authorized human reviewers. The system only surfaces language patterns for review."],
  ["How are errors corrected?", "Correction mechanisms, version history, and acknowledgment events are designed into the audit trail."],
  ["Can data be used for research?", "Only under a published policy, explicit and revocable consent, approved de-identification, and governance review. None is active in this public prototype."],
  ["What happens when models change?", "Model, version, timestamp, inputs, and transformation behavior must be re-observed and revalidated over time."],
  ["Is this affiliated with MGB/BWH?", "No affiliation or endorsement is claimed. The Foxborough work is described only as a proposed co-design opportunity."],
  ["What evidence is needed before live use?", "Approved intended use, governance, privacy, security, legal and regulatory review, silent validation, stop rules, and an institution-controlled go/no-go decision."],
] as const;

export function TrustFAQs() {
  return <Accordion type="multiple" className="faq-list">{trustFaqs.map(([q, a], index) => <AccordionItem value={`faq-${index}`} key={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent><p>{a}</p></AccordionContent></AccordionItem>)}</Accordion>;
}
