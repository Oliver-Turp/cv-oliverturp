export default function Experience({ heading, data }) {
  return (
    <section className="section experience">
      <h3>{heading}</h3>

      {data.items.map((job, index) => (
        <div key={index} style={{ marginBottom: "24px" }}>
          <span>
            <strong>{job.role}</strong> — {job.company}
            <span style={{ fontSize: "14px", color: "#666" }}> | {job.years}</span>
          </span>
          {job.description.split('\n').map((line, i) =>
            line.startsWith('-') ? (
              <p key={i}>{line.replace('-', '• ').trim()}</p>
            ) : (
              <p key={i}>{line}</p>
            )
          )}
        </div>
      ))}
    </section>
  );
}