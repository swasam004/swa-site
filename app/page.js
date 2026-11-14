import Link from "next/link";
import "./home.css";
import { getSite, getPosts } from "../lib/data";
export const revalidate = 60;

const EMAIL = "swasam004@gmail.com";
const PHONE_LOCAL = "0701000866";
const PHONE_INTL = "254701000866"; // Kenya: 0701000866 -> +254701000866
const TOOL_URL = "https://swa-data-tool.onrender.com";

const SKILLS = ["KoboToolbox", "ODK", "SurveyCTO", "CHIS", "Excel dashboards", "Next.js", "React", "Firebase", "Web design", "Data collection", "Reporting"];
const DO = [
  ["Health data in the field", "I collect, clean and report data with ODK, KoboToolbox, SurveyCTO and CHIS, so programme decisions rest on evidence.", "c1"],
  ["Websites and apps", "I design and ship full web apps with React, Next.js and Firebase, with admin panels, maps and several languages.", "c2"],
  ["Tools for small business", "Excel sales dashboards, bills of quantities and payment sheets with automated formulas that flag errors before they cost money.", "c3"],
];
const BUILT = [
  ["SWA Data Analysis Tool", "A web tool I built for analysing data quickly. Upload your data and get insights without wrestling with spreadsheets. Free to try.", ["Data analysis", "Web app", "Live"], TOOL_URL],
  ["Grand Jet Solutions Cyber", "My cyber café in Ugunja Town, now online. It helps people with eCitizen, KRA iTax and SHA, plus printing and document services.", ["Website", "Local SEO", "Print design"], "https://grand-jet-cyber.vercel.app"],
  ["WeMECS", "A marketplace that brings mobile mechanics to drivers across Kenya, with a live map, four languages, receipts and admin approval of technicians.", ["HTML/CSS/JS", "Leaflet map", "Admin panel"]],
  ["Smart Tech Solutions", "A multilingual services platform with an admin panel, mobile-first navigation and a database behind it.", ["Next.js", "Postgres", "English, Spanish, French"]],
  ["Bure Dating", "A social app built on React and Firebase, with sign-up that adapts to five languages.", ["React", "Firebase", "5 languages"]],
];

function excerpt(p, n = 240) {
  const raw = p.excerpt || p.summary || p.description || p.body || p.content || "";
  const clean = String(raw).replace(/<[^>]*>/g, " ").replace(/[#*_>`~\[\]]/g, "").replace(/\s+/g, " ").trim();
  return clean.length > n ? clean.slice(0, n).replace(/\s+\S*$/, "") + "…" : clean;
}

export default async function Home() {
  const [s, posts] = await Promise.all([getSite(), getPosts()]);
  const tape = [...SKILLS, ...SKILLS];
  const latest = posts[0];
  const older = posts.slice(1, 4);
  const cover = latest && (latest.image || latest.cover || latest.photo);

  return (
    <main>
      <section className="hero">
        <span className="blob b1" aria-hidden="true" />
        <span className="blob b2" aria-hidden="true" />
        <div className="hero-in">
          <p className="open"><i /> Open to entry-level roles in public health and NGO programming</p>
          <h1>{s.name}</h1>
          <p className="hero-lead">Community health graduate from Ugunja, Siaya. I turn field data into decisions, and everyday problems into working websites and tools.</p>
          <p className="ctas">
            <a className="btn solid" href="#built">See what I have built</a>
            <a className="btn" href={TOOL_URL} target="_blank" rel="noopener">Try the data tool</a>
            <Link className="btn" href="/writing">Read my writing</Link>
          </p>
        </div>
        <div className="tape" aria-hidden="true"><div>{tape.map((t, i) => <span key={i}>{t}</span>)}</div></div>
      </section>

      <section className="sec tinted">
        <h2>What I do</h2>
        <div className="three">
          {DO.map(([t, d, c]) => <div key={t} className={`pillar ${c}`}><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>

      <section className="sec" id="built">
        <h2>Things I have built</h2>
        <div className="built">
          {BUILT.map(([t, d, tags, url], i) => (
            <article key={t} className={`proj ${i === 0 ? "featured" : ""}`}>
              {i === 0 && <span className="badge">New · Live tool</span>}
              <h3>{url ? <a href={url} target="_blank" rel="noopener">{t}</a> : t}</h3>
              <p>{d}</p>
              <p className="tags">{tags.map(x => <span key={x}>{x}</span>)}</p>
              {url && <a className="visit" href={url} target="_blank" rel="noopener">Open ↗</a>}
            </article>
          ))}
        </div>
      </section>

      {/* Latest writing, placed mid-page so visitors find it */}
      <section className="latest" id="latest">
        <div className="latest-in">
          <h2>Latest writing</h2>
          {latest ? (
            <>
              <article className={`feature ${cover ? "has-img" : ""}`}>
                {cover && <img src={cover} alt="" loading="lazy" />}
                <div className="feature-body">
                  <small className="date">{latest.date}</small>
                  <h3><Link href={`/writing/${latest.slug}`}>{latest.title}</Link></h3>
                  {excerpt(latest) && <p>{excerpt(latest)}</p>}
                  <Link className="btn solid" href={`/writing/${latest.slug}`}>Read more →</Link>
                </div>
              </article>
              {older.length > 0 && (
                <div className="more-list">
                  {older.map(p => <p key={p.id} className="post"><Link href={`/writing/${p.slug}`}>{p.title}</Link><small>{p.date}</small></p>)}
                  <Link className="all" href="/writing">All writing →</Link>
                </div>
              )}
            </>
          ) : (
            <p>Essays are on the way. <Link href="/writing">Check the writing page</Link>.</p>
          )}
        </div>
      </section>

      <section className="sec tinted">
        <h2>Background</h2>
        <div className="bg">
          <div><h3>Education</h3><p><b>BSc Community Health and Development</b><br />Masinde Muliro University of Science and Technology<br />2020 to 2024, Second Class Upper Division</p></div>
          <div><h3>Work</h3><p><b>Founder, Grand Jet Solutions Cyber</b><br />Digital services and government e-services support, Ugunja Town</p></div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div className="hero-in">
          <h2>Hiring for a public health or programme role?</h2>
          <p>I would like to hear from you. Reach me any way you prefer.</p>
          <div className="contact-grid">
            <a className="contact-card" href={`mailto:${EMAIL}`}><span>✉️ Email</span><b>{EMAIL}</b></a>
            <a className="contact-card" href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noopener"><span>💬 WhatsApp</span><b>{PHONE_LOCAL}</b></a>
            <a className="contact-card" href={`tel:+${PHONE_INTL}`}><span>📞 Call</span><b>{PHONE_LOCAL}</b></a>
          </div>
          <p>{(s.links || []).map(l => <a className="btn solid" key={l.url} href={l.url} rel="me">{l.label}</a>)}</p>
        </div>
      </section>
    </main>
  );
}
