export default function Projects({ heading, data }) {
  return (
    <section className="section projects">
      <h3>{heading}</h3>

      {data.items.map((proj, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <strong>
            <a href={proj.url} target="_blank">{proj.name}</a>
          </strong>
          <p>{proj.description}</p>
        </div>
      ))}
    </section>
  );
}
