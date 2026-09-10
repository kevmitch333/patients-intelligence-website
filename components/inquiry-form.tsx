"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function InquiryForm({ pilotOnly = false }: { pilotOnly?: boolean }) {
  const [attempted, setAttempted] = useState(false);
  const [safe, setSafe] = useState(false);
  const [consent, setConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [state, setState] = useState<"idle" | "ready">("idle");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setAttempted(true);
    const form = event.currentTarget;
    if (!form.checkValidity() || !safe || !consent || !termsAccepted) { form.reportValidity(); return; }
    setState("ready");
  }
  if (state === "ready") return <div className="form-success" role="status"><CheckCircle2 size={28} /><h3>Your inquiry is ready for secure routing.</h3><p>This private prototype does not connect to a submission backend, so nothing was sent or stored. Founder approval is required before a secure organizational-inquiry endpoint is activated.</p><Button onClick={() => setState("idle")} variant="outline">Return to form</Button></div>;
  return (
    <form className="inquiry-form" onSubmit={submit} noValidate>
      <div className="form-grid"><div><Label htmlFor="name">Full name</Label><Input id="name" name="name" autoComplete="name" required placeholder="Your name" /></div><div><Label htmlFor="email">Work email</Label><Input id="email" name="email" type="email" autoComplete="email" required placeholder="name@organization.org" /></div><div><Label htmlFor="organization">Organization</Label><Input id="organization" name="organization" autoComplete="organization" required placeholder="Organization name" /></div><div><Label htmlFor="role">Role</Label><Input id="role" name="role" required placeholder="Your role" /></div></div>
      {pilotOnly && <div className="form-grid"><div><Label htmlFor="setting">Ambulatory setting or department</Label><Input id="setting" name="setting" required placeholder="e.g., primary care operations" /></div><div><Label htmlFor="concern">Primary workflow concern</Label><Select name="concern" required><SelectTrigger id="concern" className="w-full"><SelectValue placeholder="Select a concern" /></SelectTrigger><SelectContent><SelectItem value="inbox">Inbox review burden</SelectItem><SelectItem value="routing">Routing consistency</SelectItem><SelectItem value="governance">AI governance readiness</SelectItem><SelectItem value="patient">Patient communication</SelectItem><SelectItem value="research">Measurement design</SelectItem></SelectContent></Select></div></div>}
      <div><Label htmlFor="interest">Interest path</Label><Select name="interest" required defaultValue={pilotOnly ? "pilot" : undefined}><SelectTrigger id="interest" className="w-full"><SelectValue placeholder="Choose the conversation" /></SelectTrigger><SelectContent><SelectItem value="pilot">Explore a pilot</SelectItem><SelectItem value="founding">Join the Founding 100</SelectItem><SelectItem value="research">Collaborate on research</SelectItem><SelectItem value="standard">Discuss the PGI Standard</SelectItem><SelectItem value="technical">Explore technical integration</SelectItem><SelectItem value="funding">Fund standards or validation work</SelectItem><SelectItem value="media">Media inquiry</SelectItem></SelectContent></Select></div>
      <div><div className="message-warning"><AlertTriangle size={17} /><span><strong>Do not include health information.</strong> No symptoms, diagnoses, records, patient names, or other health details.</span></div><Label htmlFor="message">Short non-clinical message</Label><Textarea id="message" name="message" required maxLength={600} placeholder="Tell us about your organization, workflow interest, or research question—not a patient or medical situation." /></div>
      <label className="check-row"><Checkbox checked={safe} onCheckedChange={(value) => setSafe(value === true)} aria-describedby="safe-help" /><span id="safe-help">I will not include patient names, medical records, symptoms, diagnoses, or other health information in this form.</span></label>
      <label className="check-row"><Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} /><span>I consent to be contacted about this organizational or research inquiry.</span></label>
      <label className="check-row"><Checkbox checked={termsAccepted} onCheckedChange={(value) => setTermsAccepted(value === true)} /><span>I agree to the <Link href="/terms" target="_blank">Interim Terms of Use</Link> and understand this is not a clinical submission channel.</span></label>
      {attempted && (!safe || !consent || !termsAccepted) && <p className="form-error" role="alert">Confirm all acknowledgments before continuing.</p>}
      <div className="form-submit"><Button type="submit" size="lg"><Mail /> Prepare inquiry</Button><p>Prototype behavior: validates locally, sends nothing, and stores nothing.</p></div>
    </form>
  );
}
