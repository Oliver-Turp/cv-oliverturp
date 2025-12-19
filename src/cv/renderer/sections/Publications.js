export default function Publications({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>

      {data.items.map((pub, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <strong>
            <a href={pub.url} target="_blank" rel="noopener noreferrer">
              {pub.title}
            </a>
          </strong>
          <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
            {pub.publisher} • {pub.year}
          </div>
        </div>
      ))}
    </section>
  );
}
