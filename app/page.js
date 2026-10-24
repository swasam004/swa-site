import Link from "next/link";
import "./home.css";
import { getSite, getPosts } from "../lib/data";
export const revalidate = 60;

const SKILLS = ["KoboToolbox", "ODK", "SurveyCTO", "CHIS", "Excel dashboards", "Next.js", "React", "Firebase", "Web design", "Data collection", "Reporting"];
const DO = [
  ["Health data in the field", "I collect, clean and report data with ODK, KoboToolbox, SurveyCTO and CHIS, so programme decisions rest on evidence.", "c1"],
  ["Websites and apps", "I design and ship full web apps with React, Next.js and Firebase, with admin panels, maps and several languages.", "c2"],
  ["Tools for small business", "Excel sales dashboards, bills of quantities and payment sheets with automated formulas that flag errors before they cost money.", "c3"],
];
const BUILT = [
  ["Grand Jet Solutions Cyber", "My cyber café in Ugunja Town, now online. It helps people with eCitizen, KRA iTax and SHA, plus printing and document services.", ["Website", "Local SEO", "Print design"], "https://grand-jet-cyber.vercel.app"],
  ["WeMECS", "A marketplace that brings mobile mechanics to drivers across Kenya, with a live map, four languages, receipts and admin approval of technicians.", ["HTML/CSS/JS", "Leaflet map", "Admin panel"]],
  ["Smart Tech Solutions", "A multilingual services platform with an admin panel, mobile-first navigation and a database behind it.", ["Next.js", "Postgres", "English, Spanish, French"]],
  ["Bure Dating", "A social app built on React and Firebase, with sign-up that adapts to five languages.", ["React", "Firebase", "5 languages"]],
];

export default async function Home() {
  const [s, posts] = await Promise.all([getSite(), getPosts()]);
  const tape = [...SKILLS, ...SKILLS];
  return (
    <main>
      <section className="hero">
        <div className="hero-in">
          <p className="open"><i /> Open to entry-level roles in public health and NGO programming</p>
          <h1>{s.name}</h1>
          <p className="hero-lead">Community health graduate from Ugunja, Siaya. I turn field data into decisions, and everyday problems into working websites and tools.</p>
          <p className="ctas"><a className="btn solid" href="#built">See what I have built</a><Link className="btn" href="/writing">Read my writing</Link></p>
        </div>
        <div className="tape" aria-hidden="true"><div>{tape.map((t, i) => <span key={i}>{t}</span>)}</div></div>
      </section>

      <section className="sec">
        <h2>What I do</h2>
        <div className="three">
          {DO.map(([t, d, c]) => <div key={t} className={`pillar ${c}`}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>

      <section className="sec" id="built">
        <h2>Things I have built</h2>
        <div className="built">
          {BUILT.map(([t, d, tags, url]) => (
            <article key={t} className="proj">
              <h3>{url ? <a href={url}>{t}</a> : t}</h3>
              <p>{d}</p>
              <p className="tags">{tags.map(x => <span key={x}>{x}</span>)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sec">
        <h2>Background</h2>
        <div className="bg">
          <div><h3>Education</h3><p><b>BSc Community Health and Development</b><br />Masinde Muliro University of Science and Technology<br />2020 to 2024, Second Class Upper Division</p></div>
          <div><h3>Work</h3><p><b>Founder, Grand Jet Solutions Cyber</b><br />Digital services and government e-services support, Ugunja Town</p></div>
        </div>
      </section>

      <section className="sec">
        <h2>Latest writing</h2>
        {posts.slice(0, 3).map(p => <p key={p.id} className="post"><Link href={`/writing/${p.slug}`}>{p.title}</Link><small>{p.date}</small></p>)}
        {!posts.length && <p>Essays are on the way. <Link href="/writing">Check the writing page</Link>.</p>}
      </section>

      <section className="cta">
        <div className="hero-in">
          <h2>Hiring for a public health or programme role?</h2>
          <p>I would like to hear from you.</p>
          <p>{(s.links || []).map(l => <a className="btn solid" key={l.url} href={l.url} rel="me">{l.label}</a>)}</p>
        </div>
      </section>
    </main>
  );
}
