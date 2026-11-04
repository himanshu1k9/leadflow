import Header from "@/components/Header";

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface LeadResponse {
  success: boolean;
  message: string;
  data: Lead[];
}

export default async function Home() {
  const response = await fetch("http://localhost:3001/api/v1/leads", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads.");
  }

  const result: LeadResponse = await response.json();
  return (
    <main className="p-8">
      <Header />
      <h1 className="text-2xl font-bold">Lead Management</h1>
      <div className="mt-6 space-y-4">
        {result.data.map((lead) => (
          <div key={lead.id} className="rounded border p-4">
            <h2>{lead.name}</h2>
            <p>{lead.email}</p>
            <p>Status: {lead.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
