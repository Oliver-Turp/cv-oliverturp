export default function Education({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>

      {data.items.map((edu, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <span>
            <strong>{edu.degree}</strong> — {edu.institution}
            <span style={{ fontSize: "14px", color: "#666" }}> | {edu.years}</span>
          </span>
          <p>{edu.description}</p>
        </div>
      ))}
    </section>
  );
}