import "./bold-header.css";

export default function BoldHeaderLayout({ name, title, children }) {
  return (
    <main className="bold-header">
      <header className="header">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </header>

      <div className="content">{children}</div>
    </main>
  );
}