import "server-only";
import type { LeadApiResponse } from "@/types/lead";

export async function getLeads(): Promise<LeadApiResponse> {
  const apiUrl = process.env.NEST_API_URL;
  if (!apiUrl) {
    throw new Error("NEST_API_URL is not configured");
  }

  const response = await fetch(`${apiUrl}/api/v1/leads`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}
