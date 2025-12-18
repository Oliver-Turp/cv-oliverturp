export default function Experience({ heading, data }) {
  return (
    <section className="section experience">
      <h3>{heading}</h3>

      {data.items.map((job, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          <span><strong>{job.role}</strong> — {job.company}</span>
          <div style={{ fontSize: "14px", color: "#666" }}>{job.years}</div>
          <p>{job.description}</p>
        </div>
      ))}
    </section>
  );
}
