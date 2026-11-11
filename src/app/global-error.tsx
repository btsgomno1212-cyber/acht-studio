"use client";

import { useEffect } from "react";

/**
 * Letzte Rückfallebene: erscheint nur, wenn schon das Grundgerüst der Seite
 * (Layout) nicht geladen werden kann. Bringt deshalb eigenes HTML und eigene
 * Stile mit und ist zweisprachig, weil die Sprache hier nicht bekannt ist.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#080808",
          color: "#ffffff",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <title>Fehler / Error</title>
        <main style={{ maxWidth: "34rem", padding: "2rem" }}>
          <h1 style={{ margin: 0, fontSize: "2rem", lineHeight: 1.15 }}>
            Die Seite konnte nicht geladen werden
          </h1>
          <p lang="en" style={{ margin: "0.5rem 0 0", color: "#a8a8a8" }}>
            This page could not be loaded.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "2rem",
              height: "3.5rem",
              padding: "0 1.75rem",
              border: 0,
              borderRadius: "999px",
              background: "#ffffff",
              color: "#080808",
              font: "inherit",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Seite neu laden / Reload
          </button>
        </main>
      </body>
    </html>
  );
}
