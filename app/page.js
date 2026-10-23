import Link from "next/link";
import Bars from "../lib/Bars";
import { getSite, getPosts, list } from "../lib/data";
export const revalidate = 60;
export default async function Home() {
  const [s, posts, inds] = await Promise.all([getSite(), getPosts(), list("indicators")]);
  return (
    <main className="wrap">
      <h1>{s.name}</h1>
      <p className="lead">{s.tagline}</p>
      <p>{s.bio}</p>
      <div className="stats"><div><b>{s.reached}</b> boys reached</div><div><b>{s.sessions}</b> sessions held</div></div>
      {inds[0] && <Bars ind={inds[0]} />}
      <h2>Latest writing</h2>
      {posts.slice(0, 3).map(p => <p key={p.id}><Link href={`/writing/${p.slug}`}>{p.title}</Link><br /><small>{p.date}</small></p>)}
      {!posts.length && <p>No essays published yet.</p>}
    </main>
  );
}
