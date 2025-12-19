// app/print-view/page.js
import CV from "../../cv/renderer/CV";
import ErrorBoundary from "../../cv/renderer/ErrorBoundary";

export default function PrintView() {
  return (
    <div className="print-view">
      <ErrorBoundary>
        <CV />
      </ErrorBoundary>
    </div>
  );
}