import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main id="main-content" className="not-found"><div><span className="eyebrow">404 / Unknown route</span><h1>This path is not part of the current evidence map.</h1><p>Return to the Patients Intelligence overview or open the synthetic workflow demonstration.</p><div className="button-group"><Link className="button button-primary" href="/"><ArrowLeft size={17} /> Return home</Link><Link className="button button-secondary" href="/demo">Open demo</Link></div></div></main>; }
