import LeadTable from "@/components/leads/LeadTable";
import { getLeads } from "@/lib/leads/getLeads";

export default async function LeadsPage() {
  const result = await getLeads();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Lead Management</h1>
      <LeadTable initialLeads={result.data} />
    </main>
  );
}
