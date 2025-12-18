// page.js
import CV from "../cv/renderer/CV";
import ErrorBoundary from "../cv/renderer/ErrorBoundary";

export default function Page() {
  return (
    <ErrorBoundary>
      <CV />
    </ErrorBoundary>
  );
}