export default function Education({ heading, data }) {
  return (
    <section className="section education">
      <h3>{heading}</h3>

      {data.items.map((edu, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <span>
            <strong>{edu.degree}</strong> — {edu.institution}
            <span style={{ fontSize: "14px", color: "#666" }}> | {edu.years}</span>
            {edu.description && <span style={{ color: "#444" }}> — {edu.description}</span>}
          </span>
        </div>
      ))}
    </section>
  );
}
