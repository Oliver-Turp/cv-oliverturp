export default function Certifications({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>

      {data.items.map((cert, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <strong>
            {cert.url ? (
              <a href={cert.url} target="_blank" rel="noopener noreferrer">
                {cert.name}
              </a>
            ) : (
              cert.name
            )}
          </strong>
          <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
            {cert.issuer} • {cert.year}
          </div>
        </div>
      ))}
    </section>
  );
}
