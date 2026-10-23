export default function Body({ text = "" }) {
  return text.split(/\n\s*\n/).map((p, i) =>
    p.startsWith("## ") ? <h2 key={i}>{p.slice(3)}</h2> : <p key={i}>{p}</p>);
}
