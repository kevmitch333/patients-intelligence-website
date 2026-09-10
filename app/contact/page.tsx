import { Building2, FlaskConical, Handshake, Newspaper, Plug, UsersRound, WalletCards } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { PageHero, SafetyNotice, SectionHeading } from "@/components/site-shell";

export const metadata = { title: "Contact", description: "Choose a non-clinical organizational, pilot, research, standards, technical, funding, or media conversation." };

const paths = [[Building2, "Explore a pilot"], [UsersRound, "Join the Founding 100"], [FlaskConical, "Collaborate on research"], [Handshake, "Discuss the PGI Standard"], [Plug, "Explore technical integration"], [WalletCards, "Fund standards or validation"], [Newspaper, "Media inquiry"]] as const;

export default function Contact() {
  return <main id="main-content"><PageHero eyebrow="Contact" title="Choose the conversation you want to start." lede="This channel is for organizational, implementation, research, standards, funding, and media inquiries. It is not a clinical intake channel." />
    <section className="section"><div className="container contact-paths">{paths.map(([Icon, label]) => <a key={label} href="#inquiry"><Icon /><span>{label}</span></a>)}</div></section>
    <section className="section form-section" id="inquiry"><div className="container form-layout"><div><SectionHeading eyebrow="Non-clinical inquiry" title="Tell us what kind of collaboration you are exploring." copy="Use organizational context only. A secure clinical submission workflow does not exist on this website." /><SafetyNotice /></div><InquiryForm /></div></section></main>;
}
