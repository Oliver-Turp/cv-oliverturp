export default function Education({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>

      {data.items.map((edu, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <strong>{edu.degree}</strong> — {edu.institution}
          <div style={{ fontSize: "14px", color: "#666" }}>{edu.years}</div>
          <p>{edu.description}</p>
        </div>
      ))}
    </section>
  );
}
