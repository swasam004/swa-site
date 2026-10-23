import Bars from "../../lib/Bars";
import { list } from "../../lib/data";
export const revalidate = 60;
export const metadata = { title: "Boy-Child Barometer" };
export default async function Barometer() {
  const inds = await list("indicators");
  return (
    <main className="wrap">
      <h1 className="h1s">Boy-Child Barometer</h1>
      <p className="lead">Sourced numbers on the lives of boys and young men in Siaya. Every figure names its source and year.</p>
      {inds.map(i => <Bars key={i.id} ind={i} />)}
      {!inds.length && <p>No charts added yet.</p>}
    </main>
  );
}
