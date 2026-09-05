type SectionHeadingProps = { id: string; number: string; label: string; title: string; intro?: string };

export function SectionHeading({ id, number, label, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span className="section-number" aria-hidden="true">{number}</span>{label}</p>
      <h2 id={id} className="section-title whitespace-pre-line">{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
