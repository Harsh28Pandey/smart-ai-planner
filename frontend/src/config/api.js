/** Backend API origin. Override with VITE_API_URL in frontend/.env (see .env.example). */
export const API_BASE_URL =
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8000";
