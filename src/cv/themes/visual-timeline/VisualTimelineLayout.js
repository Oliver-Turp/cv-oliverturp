import "./visual-timeline.css";

export default function VisualTimelineLayout({ name, title, children }) {
  return (
    <main className="visual-timeline">
      <header className="header">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </header>

      <div className="content">{children}</div>
    </main>
  );
}