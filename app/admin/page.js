"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, addDoc, setDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const CONF = {
  posts: { fields: [["title"], ["slug"], ["date", "date"], ["indicator", "chart"], ["body", "area"], ["published", "check"]],
    blank: { title: "", slug: "", date: new Date().toISOString().slice(0, 10), indicator: "", body: "", published: false } },
  indicators: { fields: [["label"], ["unit"], ["source"], ["year"], ["items", "area"]], blank: { label: "", unit: "", source: "", year: "", items: "" } },
};
const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Crud({ col }) {
  const c = CONF[col];
  const [rows, setRows] = useState([]); const [inds, setInds] = useState([]);
  const [f, setF] = useState(null); const [msg, setMsg] = useState("");
  const load = async () => {
    const g = async n => (await getDocs(collection(db, n))).docs.map(d => ({ id: d.id, ...d.data() }));
    setRows(await g(col)); setInds(await g("indicators"));
  };
  useEffect(() => { load(); }, [col]);
  const edit = r => setF({ ...r, items: Array.isArray(r.items) ? r.items.map(i => `${i.label}: ${i.value}`).join("\n") : r.items });
  const save = async () => {
    const { id, ...d } = f;
    if (col === "posts" && !d.slug) d.slug = slugify(d.title);
    if (col === "indicators") d.items = d.items.split("\n").map(l => l.split(":")).filter(a => a.length > 1).map(a => ({ label: a[0].trim(), value: parseFloat(a[1]) }));
    try { id ? await setDoc(doc(db, col, id), d) : await addDoc(collection(db, col), d); setF(null); setMsg("Saved"); load(); }
    catch (e) { setMsg("Could not save: " + e.message); }
  };
  const del = async r => { if (confirm(`Delete "${r.title || r.label}"?`)) { await deleteDoc(doc(db, col, r.id)); setMsg("Deleted"); load(); } };
  const set = k => v => setF({ ...f, [k]: v });
  return (
    <section>
      <p>{msg}</p>
      {!f && <>
        <button onClick={() => setF({ ...c.blank })}>New</button>
        {rows.map(r => <div className="item" key={r.id}><span>{r.title || r.label}{r.published === false && " (draft)"}</span>
          <span><button onClick={() => edit(r)}>Edit</button><button onClick={() => del(r)}>Delete</button></span></div>)}
      </>}
      {f && <div>
        {c.fields.map(([k, t]) => <label key={k}>{k === "items" ? "Data (one per line, Label: value)" : k}
          {t === "area" ? <textarea rows={k === "body" ? 14 : 6} value={f[k] || ""} onChange={e => set(k)(e.target.value)} />
            : t === "check" ? <input type="checkbox" checked={!!f[k]} onChange={e => set(k)(e.target.checked)} />
            : t === "chart" ? <select value={f[k] || ""} onChange={e => set(k)(e.target.value)}><option value="">None</option>{inds.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}</select>
            : <input type={t || "text"} value={f[k] || ""} onChange={e => set(k)(e.target.value)} />}
        </label>)}
        <button onClick={save}>Save</button><button onClick={() => setF(null)}>Cancel</button>
      </div>}
    </section>
  );
}

function Site() {
  const [f, setF] = useState(null); const [msg, setMsg] = useState("");
  useEffect(() => {
    getDoc(doc(db, "settings", "site")).then(s => {
      const d = s.exists() ? s.data() : {};
      setF({ name: "Swa Samson Opondo", tagline: "", bio: "", reached: 0, sessions: 0, ...d, links: (d.links || []).map(l => `${l.label} | ${l.url}`).join("\n") });
    });
  }, []);
  if (!f) return null;
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const save = async () => {
    const d = { ...f, reached: +f.reached, sessions: +f.sessions,
      links: f.links.split("\n").map(l => l.split("|").map(x => x.trim())).filter(a => a[1]).map(a => ({ label: a[0], url: a[1] })) };
    try { await setDoc(doc(db, "settings", "site"), d); setMsg("Saved"); } catch (e) { setMsg("Could not save: " + e.message); }
  };
  return (
    <section><p>{msg}</p>
      <label>Name<input value={f.name} onChange={set("name")} /></label>
      <label>Tagline<input value={f.tagline} onChange={set("tagline")} /></label>
      <label>Bio<textarea rows={5} value={f.bio} onChange={set("bio")} /></label>
      <label>Links (one per line, Label | URL)<textarea rows={6} value={f.links} onChange={set("links")} /></label>
      <label>Boys reached<input type="number" value={f.reached} onChange={set("reached")} /></label>
      <label>Sessions held<input type="number" value={f.sessions} onChange={set("sessions")} /></label>
      <button onClick={save}>Save</button>
    </section>
  );
}

export default function Admin() {
  const [u, setU] = useState(undefined); const [tab, setTab] = useState("posts");
  const [e, setE] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  useEffect(() => onAuthStateChanged(auth, setU), []);
  if (u === undefined) return null;
  if (!u) return (
    <main className="wrap"><h1 className="h1s">Admin sign in</h1>
      <label>Email<input value={e} onChange={x => setE(x.target.value)} /></label>
      <label>Password<input type="password" value={p} onChange={x => setP(x.target.value)} /></label>
      <button onClick={() => signInWithEmailAndPassword(auth, e, p).catch(() => setErr("Wrong email or password."))}>Sign in</button>
      <p>{err}</p></main>
  );
  return (
    <main className="wrap"><h1 className="h1s">Admin</h1>
      <div className="tabs">
        {[["posts", "Essays"], ["indicators", "Barometer"], ["site", "Site and links"]].map(([k, n]) => <button key={k} onClick={() => setTab(k)} className={tab === k ? "on" : ""}>{n}</button>)}
        <button onClick={() => signOut(auth)}>Sign out</button>
      </div>
      {tab === "site" ? <Site /> : <Crud key={tab} col={tab} />}
    </main>
  );
}
