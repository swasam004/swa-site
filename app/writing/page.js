import Link from "next/link";
import { getPosts } from "../../lib/data";
export const revalidate = 60;
export const metadata = { title: "Writing" };
export default async function Writing() {
  const posts = await getPosts();
  return (
    <main className="wrap">
      <h1 className="h1s">Writing</h1>
      {posts.map(p => <p key={p.id}><Link href={`/writing/${p.slug}`}>{p.title}</Link><br /><small>{p.date}</small></p>)}
      {!posts.length && <p>No essays published yet.</p>}
    </main>
  );
}
