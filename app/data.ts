export type TruthStatus = "active" | "development" | "proposed" | "forming" | "future" | "draft";

export const statuses: Record<TruthStatus, { label: string; detail: string }> = {
  active: { label: "Active", detail: "Operational and available now." },
  development: { label: "In development", detail: "Currently being built or tested." },
  proposed: { label: "Proposed", detail: "Defined and awaiting approval or agreement." },
  forming: { label: "Forming", detail: "Recruitment or governance formation is underway." },
  future: { label: "Future — gated", detail: "Deferred until evidence and governance gates are met." },
  draft: { label: "Draft — open for review", detail: "Working material; not a finalized standard or policy." },
};

export const evidenceClasses = [
  { key: "verified", label: "Verified", definition: "Supported by authorized record data.", source: "Authorized record", tone: "green" },
  { key: "reported", label: "Patient-reported", definition: "Stated by the patient and not independently confirmed.", source: "Patient statement", tone: "cyan" },
  { key: "derived", label: "Derived", definition: "Calculated or summarized from verified information.", source: "Traceable calculation", tone: "indigo" },
  { key: "inferred", label: "Inferred", definition: "Produced through the source AI system’s reasoning.", source: "Source AI output", tone: "violet" },
  { key: "external", label: "External", definition: "Drawn from a cited guideline, study, or third-party source.", source: "Cited external source", tone: "gold" },
  { key: "unknown", label: "Unknown", definition: "There is not enough information to classify or verify it.", source: "Source unavailable", tone: "slate" },
] as const;

export const pgiDimensions = [
  { name: "Provenance", state: "Documented", detail: "Model family, date, prompt context, and stated inputs are recorded.", failure: "Unknown model or incomplete source history" },
  { name: "Grounding", state: "Partial", detail: "Some assertions connect to retrievable sources; others require review.", failure: "Assertions lack accessible supporting sources" },
  { name: "Record fidelity", state: "Needs review", detail: "One date differs from the synthetic authorized record.", failure: "Values or dates conflict with authorized data" },
  { name: "Urgency signal", state: "Routine human review", detail: "No urgency determination is made by the demonstration.", failure: "Language may require prompt human review" },
  { name: "Concordance", state: "Not available", detail: "An active care-plan comparison is not available in this example.", failure: "Artifact conflicts with a documented care plan" },
];

export const workflow = [
  { number: "01", name: "Observe", title: "Submission received", does: "Receives an approved artifact and stated context.", not: "Does not interpret the patient’s condition.", human: "Confirm the permitted intake channel.", logged: "Receipt, channel, time, synthetic identifier" },
  { number: "02", name: "Capture", title: "Provenance recorded", does: "Records model, date, prompt context, inputs, and cited sources when available.", not: "Does not invent missing provenance.", human: "Confirm access to authorized sources.", logged: "Model and source metadata" },
  { number: "03", name: "Separate", title: "Assertions isolated", does: "Breaks the submission into inspectable statements.", not: "Does not decide whether a statement is clinically true.", human: "Review boundaries when meaning is ambiguous.", logged: "Original text and transformation history" },
  { number: "04", name: "Verify", title: "Evidence classified", does: "Labels each assertion as verified, reported, derived, inferred, external, or unknown.", not: "Does not convert model confidence into clinical truth.", human: "Validate consequential classifications.", logged: "Labels, sources, contradictions, edits" },
  { number: "05", name: "Surface", title: "Evidence gaps shown", does: "Shows unavailable sources, mismatches, and limits.", not: "Does not infer the missing answer.", human: "Decide whether clarification is needed.", logged: "Gaps and unresolved conflicts" },
  { number: "06", name: "Profile", title: "PGI profile generated", does: "Presents five separate quality dimensions.", not: "Does not issue a single trust score or patient verdict.", human: "Interpret each dimension in context.", logged: "Dimension state and basis" },
  { number: "07", name: "Route", title: "Brief delivered", does: "Creates one role-adaptive Patient Intelligence Brief and records disposition.", not: "Does not finalize diagnosis, treatment, coding, or disposition.", human: "Acknowledge, review, route, and close.", logged: "Views, acknowledgment, edits, disposition" },
];

export const roles = {
  Patient: {
    intro: "Plain-language orientation to what the brief contains and what the care team still needs to decide.",
    order: ["Reason for request", "What the submission says", "What is supported", "What is missing", "Questions for the visit"],
    action: "Prepare questions for a clinical conversation",
  },
  Physician: {
    intro: "Clinical summary emphasis with source IDs, conflicting evidence, and open judgment points.",
    order: ["Reason for request", "Verified evidence", "AI-generated observations", "Evidence gaps", "Questions requiring clinician judgment"],
    action: "Review evidence and determine clinical next steps",
  },
  Nursing: {
    intro: "Follow-up, monitoring, education, and acknowledgment needs from the same evidence layer.",
    order: ["Reason for request", "Patient-reported information", "Evidence gaps", "Follow-up considerations", "Disposition"],
    action: "Coordinate approved follow-up",
  },
  Pharmacist: {
    intro: "Medication reconciliation and monitoring considerations, without treatment or dosing recommendations.",
    order: ["Verified evidence", "Medication considerations", "Record mismatch", "Evidence gaps", "Questions requiring clinician judgment"],
    action: "Validate medication information",
  },
  Administrative: {
    intro: "Routing, documentation, and authorization gaps are surfaced, not resolved automatically.",
    order: ["Reason for request", "Requested service", "Documentation gaps", "Authorized channel", "Disposition status"],
    action: "Route to the responsible team",
  },
  Coding: {
    intro: "Possible documentation or code candidates may be displayed for human validation only.",
    order: ["Documented facts", "Evidence source IDs", "Documentation gaps", "Human validation required", "No code submitted"],
    action: "Review candidates; never auto-submit",
  },
} as const;

export const briefSections = [
  ["Reason for request", "Clarify whether an AI-assisted interpretation of routine lab trends should be discussed at the next scheduled visit."],
  ["Verified evidence", "[S-01] Two routine lab values and dates match the synthetic authorized record."],
  ["Patient-reported information", "[S-02] The fictional patient reports using an AI assistant to organize questions."],
  ["AI-generated observations", "[S-03] The source AI suggested a trend may merit discussion. This is an observation, not a clinical conclusion."],
  ["Evidence gaps", "[S-04] Current symptoms, examination findings, and complete trend history are unavailable in the demonstration."],
  ["Medication considerations", "[S-05] One medication start date differs from the synthetic record and requires human reconciliation."],
  ["Questions requiring clinician judgment", "Does the documented trend warrant any clinical action? What context is missing?"],
  ["Suggested workflow for human review", "Acknowledge receipt and route for routine review. No urgency determination is generated."],
] as const;

export const pilotPhases = [
  { phase: "Phase 0", title: "Readiness & co-design", status: "proposed" as TruthStatus, detail: "Map the current workflow, baseline measures, inclusion boundaries, approved templates, escalation rules, privacy controls, stop criteria, and institution-controlled go/no-go decision." },
  { phase: "Phase 1", title: "Silent validation", status: "proposed" as TruthStatus, detail: "Use synthetic or institution-approved historical examples without changing clinical routing. Compare evidence labels and briefs with human review." },
  { phase: "Phase 2", title: "Limited live workflow", status: "future" as TruthStatus, detail: "Only if approved: a narrow population and channel, explicit instructions, human review at every consequential gate, weekly safety review, and immediate institutional pause authority." },
];

export const initiatives = [
  { name: "Provider Intake", status: "development" as TruthStatus, description: "The provider-facing enterprise wedge for receiving, structuring, profiling, routing, and logging patient-originated AI." },
  { name: "Patient Prepare", status: "development" as TruthStatus, description: "A limited concept that restructures material a patient already has; it does not generate new clinical conclusions." },
  { name: "PGI Standard v0.9", status: "draft" as TruthStatus, description: "A working framework for provenance, evidence labels, routing events, human review, and audit history." },
  { name: "Founding 100", status: "forming" as TruthStatus, description: "A recruited cohort of clinicians, patients and advocates, researchers, and institutional participants." },
  { name: "Vault", status: "future" as TruthStatus, description: "Patient-controlled longitudinal custody, deferred until commercial, legal, privacy, security, and governance gates are met." },
];

export const founding100 = [
  { count: 40, label: "Clinicians", contribution: "Review synthetic briefs, shape the vocabulary, and contribute workflow expertise." },
  { count: 25, label: "Patients & advocates", contribution: "Review language, consent, appeals, access, and measures of being heard." },
  { count: 20, label: "Researchers", contribution: "Help design validation, informatics, ethics, safety, and equity methods." },
  { count: 15, label: "Institutional participants", contribution: "Contribute implementation, governance, procurement, and research pathways." },
];

export const glossary = [
  ["Patient-Generated Intelligence (PGI)", "Clinical analysis, synthesis, or interpretation produced by an AI system at a patient’s direction using patient-provided inputs."],
  ["PGI Submission", "A structured patient-originated AI artifact carrying required provenance metadata."],
  ["PGI Profile", "Five separate dimensions describing a submission’s provenance, grounding, record fidelity, urgency signal, and concordance."],
  ["Patient Intelligence Brief (PIB)", "The structured output of Intake: a concise, evidence-aware object for human review."],
  ["Role-Adaptive View", "A presentation of one evidence layer with emphasis and permitted actions adjusted by role; the facts do not change."],
  ["Never-Suppress Rule", "Every accepted submission remains visible to the designated clinical workflow. Labels affect routing, not whether a patient is heard."],
  ["Provenance", "The recorded origin and transformation history of a model output, source, or assertion."],
  ["Grounding", "The connection between an assertion and retrievable supporting sources."],
  ["Record Fidelity", "Whether referenced values, dates, and history match authorized record data."],
  ["Urgency Signal", "Language patterns that may require prompt human review; not a severity diagnosis."],
  ["Concordance", "Whether assertions conflict with a documented active care plan."],
  ["Model Drift", "Change in model behavior or performance over time, versions, or contexts."],
  ["Pseudonymity", "Identifiers are separated from identity data under controlled conditions; it is not a promise of anonymity."],
] as const;

export const insightItems = [
  {
    category: "Regulatory design input",
    title: "FDA refreshed its Clinical Decision Support Software guidance",
    changed: "The FDA issued final CDS guidance in January 2026 clarifying its interpretation of non-device CDS criteria and patient/caregiver software functions.",
    strength: "Primary regulatory guidance",
    limit: "Guidance is not a product-specific legal determination or clearance.",
    implication: "Keep the intended use narrow, preserve independent clinical review, and obtain qualified counsel before deployment.",
    action: "Commission a written, product-specific regulatory analysis for Intake.",
    date: "January 2026",
    reviewed: "September 4, 2026",
    url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software",
  },
  {
    category: "Consumer health privacy",
    title: "FTC’s Health Breach Notification Rule explicitly reaches many health apps",
    changed: "The updated rule clarifies coverage and includes unauthorized disclosures in its breach definition.",
    strength: "Primary regulator explanation",
    limit: "Applicability depends on product facts and requires legal analysis.",
    implication: "Prepare and any future consumer surface need data minimization and a privacy posture designed beyond HIPAA assumptions.",
    action: "Keep the public prototype free of health-data collection and advertising technology.",
    date: "April 2024",
    reviewed: "September 4, 2026",
    url: "https://www.ftc.gov/business-guidance/blog/2024/04/updated-ftc-health-breach-notification-rule-puts-new-provisions-place-protect-users-health-apps",
  },
  {
    category: "Health AI assurance",
    title: "Massachusetts invested in a Health AI Assurance Laboratory",
    changed: "MassTech funded a UMass Chan and MITRE-led lab focused on evaluation infrastructure and responsible health AI adoption.",
    strength: "Primary public announcement",
    limit: "Ecosystem context only; no relationship with Patients Intelligence is implied.",
    implication: "Upstream product assurance can complement per-submission, downstream intake assurance.",
    action: "Explore methodology review only after the PGI draft and validation protocol are ready.",
    date: "April 2024",
    reviewed: "September 4, 2026",
    url: "https://masstech.org/news/health-ai-lab",
  },
];
