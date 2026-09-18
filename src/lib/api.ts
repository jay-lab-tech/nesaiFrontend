const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api/v1";
export type HealthResponse = { data: { status: string; service: string } };
export async function getApiHealth(): Promise<HealthResponse> { const response = await fetch(`${apiUrl}/health`, { cache: "no-store" }); if (!response.ok) throw new Error("NESAS API is unavailable."); return response.json(); }
