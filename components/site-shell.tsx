import Link from "next/link";
import { ArrowUpRight, Menu, ShieldCheck } from "lucide-react";
import { statuses, type TruthStatus } from "@/app/data";

const primaryNav = [
  ["How It Works", "/how-it-works"],
  ["Platform", "/platform"],
  ["Pilot", "/pilot"],
  ["PGI Standard", "/pgi-standard"],
  ["Trust & Governance", "/trust"],
  ["About", "/about"],
] as const;

export function StatusTag({ status, compact = false }: { status: TruthStatus; compact?: boolean }) {
  const item = statuses[status];
  return (
    <span className={`status-tag status-${status}`} title={item.detail}>
      <span aria-hidden="true" className="status-mark" />
      {compact ? item.label.replace(" — gated", "") : item.label}
    </span>
  );
}

export function Header() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="wordmark" aria-label="Patients Intelligence home">
            <span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span>
            <span><strong>Patients Intelligence</strong><small>Clinical AI intake infrastructure</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {primaryNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <Link href="/pilot#co-design" className="button button-primary header-cta">Explore a pilot <ArrowUpRight size={16} /></Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><Menu size={23} /></summary>
            <nav aria-label="Mobile navigation">
              {primaryNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link href="/demo">Synthetic demo</Link>
              <Link href="/partners">Partners</Link>
              <Link href="/insights">Insights</Link>
              <Link href="/contact" className="button button-primary">Explore a pilot</Link>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="Product trust principles">
      <div className="container trust-strip-inner">
        <ShieldCheck size={15} aria-hidden="true" />
        <span>Submission, not patient</span><i />
        <span>Model-neutral</span><i />
        <span>Clinician remains in control</span><i />
        <span>Never suppress</span><i />
        <span>Fully auditable</span>
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, lede, status, children, dark = false }: {
  eyebrow: string; title: string; lede: string; status?: TruthStatus; children?: React.ReactNode; dark?: boolean;
}) {
  return (
    <section className={`page-hero ${dark ? "page-hero-dark" : ""}`}>
      <div className="container page-hero-grid">
        <div>
          <div className="eyebrow-row"><span className="eyebrow">{eyebrow}</span>{status && <StatusTag status={status} />}</div>
          <h1>{title}</h1>
          <p className="lede">{lede}</p>
          {children}
        </div>
        <div className="hero-index" aria-hidden="true"><span>PI</span><small>Evidence / Workflow / Trust</small></div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function SafetyNotice() {
  return (
    <aside className="safety-notice" aria-label="Safety notice">
      <ShieldCheck size={20} aria-hidden="true" />
      <p><strong>Demonstration and organizational inquiries only.</strong> Patients Intelligence does not provide diagnosis or treatment. It structures patient-originated AI for review by qualified healthcare professionals. Do not submit medical records or personal health information on this website.</p>
    </aside>
  );
}

export function CTASection({ title = "Help define how healthcare receives patient-generated AI.", copy = "We are seeking clinical co-designers, research collaborators, patient advocates, implementation partners, and institutional pilot sponsors." }: { title?: string; copy?: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-grid">
        <div><span className="eyebrow">A bounded first problem</span><h2>{title}</h2><p>{copy}</p></div>
        <div className="button-group"><Link className="button button-light" href="/pilot#co-design">Explore a pilot <ArrowUpRight size={17} /></Link><Link className="button button-ghost-light" href="/partners#founding-100">Join the Founding 100</Link></div>
      </div>
    </section>
  );
}

export function Footer() {
  const groups = [
    ["Platform", [["How it works", "/how-it-works"], ["Platform", "/platform"], ["Synthetic demo", "/demo"], ["PGI Standard", "/pgi-standard"]]],
    ["Participate", [["Pilot", "/pilot"], ["Partners", "/partners"], ["Founding 100", "/partners#founding-100"], ["Contact", "/contact"]]],
    ["Trust", [["Trust & Governance", "/trust"], ["Research policy", "/research-policy"], ["Data governance", "/data-governance"], ["Privacy", "/privacy"], ["Accessibility", "/accessibility"]]],
    ["Company", [["About", "/about"], ["Insights", "/insights"], ["Terms", "/terms"], ["Brand & attribution", "/brand-and-attribution"]]],
  ] as const;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark wordmark-light"><span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span><span><strong>Patients Intelligence</strong><small>Clinical AI intake infrastructure</small></span></Link>
          <p>Make patient-originated AI legible, verifiable, and routable—while keeping clinical judgment human.</p>
          <div className="footer-status"><StatusTag status="development" compact /><StatusTag status="draft" compact /><StatusTag status="forming" compact /></div>
        </div>
        {groups.map(([title, links]) => <div className="footer-group" key={title}><h3>{title}</h3>{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>)}
      </div>
      <div className="container footer-bottom">
        <p>Patients Intelligence is developed within National Brand Group. Not medical advice. No emergency services.</p>
        <p>© 2026 National Brand Group · Public informational site</p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <><Header />{children}<Footer /></>;
}
