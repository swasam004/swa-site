import { notFound } from "next/navigation";
import Bars from "../../../lib/Bars";
import Body from "../../../lib/Body";
import { getPosts, list } from "../../../lib/data";
export const revalidate = 60;
export async function generateMetadata({ params }) {
  const p = (await getPosts()).find(x => x.slug === params.slug);
  return { title: p?.title };
}
export default async function Post({ params }) {
  const p = (await getPosts()).find(x => x.slug === params.slug);
  if (!p) notFound();
  const ind = p.indicator ? (await list("indicators")).find(i => i.id === p.indicator) : null;
  return (
    <article className="wrap">
      <h1 className="h1s">{p.title}</h1>
      <small>{p.date}</small>
      <Body text={p.body} />
      {ind && <Bars ind={ind} />}
    </article>
  );
}
