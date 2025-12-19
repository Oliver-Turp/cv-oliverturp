export default function Awards({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>

      {data.items.map((award, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <strong>{award.name}</strong>
          <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
            {award.year}
          </div>
          {award.description && (
            <p style={{ marginTop: "8px" }}>{award.description}</p>
          )}
        </div>
      ))}
    </section>
  );
}
