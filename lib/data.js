import { db } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
const empty = { name: "Swa Samson Opondo", tagline: "", bio: "", links: [], reached: 0, sessions: 0 };
export async function getSite() {
  try { const s = await getDoc(doc(db, "settings", "site")); return s.exists() ? { ...empty, ...s.data() } : empty; }
  catch { return empty; }
}
export async function list(c) {
  try { return (await getDocs(collection(db, c))).docs.map(d => ({ id: d.id, ...d.data() })); }
  catch { return []; }
}
export async function getPosts() {
  return (await list("posts")).filter(p => p.published).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}
