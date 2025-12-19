'use client';

export default function Header() {
  const handlePrint = () => {
    // Placeholder for ATS-safe PDF endpoint
    window.open('/api/print', '_blank');
  };

  return (
    <header className="cv-header">
      <div className="cv-header-inner">
        <span className="cv-header-title">Curriculum Vitae</span>

        <button onClick={handlePrint} className="cv-header-button">
          Print / Download PDF
        </button>
      </div>
    </header>
  );
}
