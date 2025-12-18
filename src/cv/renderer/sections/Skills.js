export default function Skills({ heading, data }) {
  return (
    <section className="section skills">
      <h3>{heading}</h3>

      {data.categories.map((cat, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <span><strong>{cat.name}:</strong> {cat.skills.join(", ")}</span>
        </div>
      ))}
    </section>
  );
}
