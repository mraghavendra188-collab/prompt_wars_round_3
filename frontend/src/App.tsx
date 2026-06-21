import { useState, useEffect } from "react";
import { CalculatorForm } from "./components/CalculatorForm";
import { ResultBreakdown } from "./components/ResultBreakdown";
import { InsightsPanel } from "./components/InsightsPanel";
import { HistoryPanel } from "./components/HistoryPanel";
import { useFootprint } from "./hooks/useFootprint";

/**
 * Application shell: composes the calculator, results, insights, and history
 * panels around the `useFootprint` hook, which owns all async state.
 */
export default function App() {
  const { result, insights, entries, loading, saving, error, status, calculate, save } =
    useFootprint();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="bg-decorations" aria-hidden="true">
        {/* Top Left Leaves */}
        <svg className="decor-leaf top-left" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 -50 Q100 50 180 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 40 Q70 10 100 50 Q60 80 30 40 Z" fill="currentColor" />
          <path d="M80 90 Q130 70 150 110 Q110 140 80 90 Z" fill="currentColor" />
          <path d="M120 150 Q180 140 190 180 Q140 200 120 150 Z" fill="currentColor" />
          <path d="M-10 10 Q10 -30 40 -10 Q20 20 -10 10 Z" fill="currentColor" />
          <path d="M-20 60 Q20 50 30 90 Q-10 100 -20 60 Z" fill="currentColor" />
        </svg>
        {/* Top Right Leaves (Mirrored) */}
        <svg className="decor-leaf top-right" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50 -50 Q100 50 180 220" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 40 Q70 10 100 50 Q60 80 30 40 Z" fill="currentColor" />
          <path d="M80 90 Q130 70 150 110 Q110 140 80 90 Z" fill="currentColor" />
          <path d="M120 150 Q180 140 190 180 Q140 200 120 150 Z" fill="currentColor" />
          <path d="M-10 10 Q10 -30 40 -10 Q20 20 -10 10 Z" fill="currentColor" />
          <path d="M-20 60 Q20 50 30 90 Q-10 100 -20 60 Z" fill="currentColor" />
        </svg>
        {/* Bottom Left Bush/Grass */}
        <svg className="decor-bush bottom-left" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300 Q100 200 120 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M30 220 Q70 180 90 220 Q60 250 30 220 Z" fill="currentColor" />
          <path d="M60 160 Q110 130 120 170 Q80 190 60 160 Z" fill="currentColor" />
          <path d="M90 100 Q150 80 150 120 Q110 130 90 100 Z" fill="currentColor" />
          <path d="M110 50 Q160 20 170 60 Q130 80 110 50 Z" fill="currentColor" />
          <path d="M-10 260 Q30 220 50 260 Q10 290 -10 260 Z" fill="currentColor" />
        </svg>
        {/* Bottom Right Bush/Grass */}
        <svg className="decor-bush bottom-right" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 300 C120 200 60 150 0 200 C30 250 90 280 150 300 Z" fill="currentColor" opacity="0.8" />
          <path d="M220 300 C200 180 120 120 50 180 C80 230 150 270 220 300 Z" fill="currentColor" opacity="0.9" />
          <path d="M300 300 C270 160 180 100 100 160 C130 220 210 270 300 300 Z" fill="currentColor" />
        </svg>
      </div>

      <nav aria-label="Skip navigation">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
      </nav>
      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          )}
        </button>
        <h1>
          Nature Themed
          <br />
          Carbon Estimator
        </h1>
        <p className="visually-hidden">Understand, track, and reduce your carbon footprint.</p>
      </header>

      <main id="main">
        <CalculatorForm onSubmit={calculate} loading={loading} />

        <div role="alert" aria-live="assertive">
          {error && <p className="error">{error}</p>}
        </div>
        <p role="status" className="visually-hidden">
          {status}
        </p>

        {result && (
          <>
            <ResultBreakdown result={result} />
            {insights && <InsightsPanel insights={insights} />}
            <div className="card">
              <button className="btn secondary" onClick={save} disabled={saving} aria-busy={saving}>
                {saving ? "Saving…" : "Save this entry to my history"}
              </button>
            </div>
          </>
        )}

        <HistoryPanel entries={entries} />
      </main>

      <footer className="app-footer">
        <p>
          Built with React &amp; TypeScript. Estimate your emissions, get personalized
          recommendations, and track your progress over time.
        </p>
      </footer>
    </>
  );
}
