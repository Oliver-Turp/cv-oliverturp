// page.js
import CV from "../cv/renderer/CV";
import ErrorBoundary from "../cv/renderer/ErrorBoundary";
import Header from "./components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <ErrorBoundary>
        <CV />
      </ErrorBoundary>
    </>
  );
}