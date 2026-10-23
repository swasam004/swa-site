export default function Bars({ ind }) {
  const items = ind.items || [];
  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <figure className="bars">
      <figcaption>{ind.label}</figcaption>
      {items.map(i => (
        <div className="row" key={i.label}>
          <span>{i.label}</span>
          <div className="track"><i style={{ width: `${(i.value / max) * 100}%` }} /></div>
          <b>{i.value}{ind.unit}</b>
        </div>
      ))}
      <small>Source: {ind.source} ({ind.year})</small>
    </figure>
  );
}
