import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Expose API URL for services (works in browser; tests can set __W2W_API_URL manually)
(globalThis as any).__W2W_API_URL = import.meta.env.VITE_API_URL;

// Optional: enable mock auth in development via VITE_MOCK_AUTH=true
(globalThis as any).__W2W_MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true';

createRoot(document.getElementById("root")!).render(<App />);
  