export default function About({ heading, data }) {
  return (
    <section className="section">
      <h3>{heading}</h3>
      <p>{data.content}</p>
    </section>
  );
}
