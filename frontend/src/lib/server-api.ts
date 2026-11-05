import "server-only";

const API_URL = process.env.NEST_API_URL;
const API_SECRET = process.env.NEST_API_SECRET;

export async function getLeads() {
  if (!API_URL || !API_SECRET) {
    throw new Error("API configuration missing");
  }

  const response = await fetch(`${API_URL}/api/v1/leads`, {
    headers: { "X-API_KEY": API_SECRET },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch leads.");
  }
  return response.json();
}
