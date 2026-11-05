import type { Lead } from "@/types/lead";

interface Props {
  status: Lead["status"];
}

export default function LeadStatusBadge({ status }: Props) {
  const styles = {
    new: "bg-blue-100 text-blue-700",
    converted: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  return (
    <span className={`px-2 py-1 rounded ${styles[status]}`}>{status}</span>
  );
}
