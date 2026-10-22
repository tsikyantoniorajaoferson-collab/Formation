"use client";

export default function FormationError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="alert alert-error" role="alert">
      <p style={{ margin: "0 0 10px" }}>Un problème est survenu en chargeant cette page.</p>
      <button type="button" className="btn btn-small" onClick={() => reset()}>
        Réessayer
      </button>
    </div>
  );
}
