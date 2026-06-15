export default function Awards({ heading, data }) {
  return (
    <section className="section awards">
      <h3>{heading}</h3>

      {data.items.map((award, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <span>
            <strong>{award.name}</strong>
            {award.description && <span> — {award.description}</span>}
            <span style={{ fontSize: "14px", color: "#666" }}> | {award.year}</span>
          </span>
        </div>
      ))}
    </section>
  );
}
