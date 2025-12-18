import "./minimalist.css";

export default function MinimalistLayout({ name, title, children }) {
  return (
    <main className="minimalist">
      <header className="header">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </header>

      <div className="content">{children}</div>
    </main>
  );
}
