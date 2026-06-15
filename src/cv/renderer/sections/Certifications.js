export default function Certifications({ heading, data }) {
  return (
    <section className="section certifications">
      <h3>{heading}</h3>

      {data.items.map((cert, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <span>
            <strong>
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                  {cert.name}
                </a>
              ) : (
                cert.name
              )}
            </strong>
            <span style={{ fontSize: "13px", color: "#666" }}> • {cert.issuer} • {cert.year}</span>
          </span>
        </div>
      ))}
    </section>
  );
}