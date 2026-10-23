import "./globals.css";
import Link from "next/link";
import { Archivo, Newsreader } from "next/font/google";
import { getSite } from "../lib/data";
const head = Archivo({ subsets: ["latin"], variable: "--head" });
const body = Newsreader({ subsets: ["latin"], variable: "--body" });
export const revalidate = 60;
export async function generateMetadata() {
  const s = await getSite();
  return { title: { default: s.name, template: `%s | ${s.name}` }, description: s.tagline };
}
export default async function Root({ children }) {
  const s = await getSite();
  const ld = { "@context": "https://schema.org", "@type": "Person", name: s.name, description: s.tagline, sameAs: (s.links || []).map(l => l.url) };
  return (
    <html lang="en">
      <body className={`${head.variable} ${body.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <header className="top">
          <Link href="/" className="brand">{s.name}</Link>
          <nav><Link href="/writing">Writing</Link><Link href="/barometer">Barometer</Link></nav>
        </header>
        {children}
        <footer className="wrap">{(s.links || []).map(l => <a key={l.url} href={l.url} rel="me">{l.label}</a>)}</footer>
      </body>
    </html>
  );
}
