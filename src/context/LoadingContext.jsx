// src/context/LoadingContext.jsx
import { createContext, useState } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          <div style={{ padding: 20, background: "white", borderRadius: 8 }}>
            Loading...
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}