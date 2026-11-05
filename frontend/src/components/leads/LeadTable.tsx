"use client";

import { useMemo, useState } from "react";
import LeadStatusBadge from "./LeadStatusBadge";

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: "new" | "converted" | "pending";
}

interface LeadTableProps {
  initialLeads: Lead[];
}

export default function LeadTable({ initialLeads }: LeadTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      const matchedSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
      const matchedStatus = status === "all" || lead.status;

      return matchedSearch && matchedStatus;
    });
  }, [initialLeads, search, status]);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search leads"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="converted">Converted</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id}>
              <td className="border p-3">{lead.id}</td>
              <td className="border p-3">{lead.name}</td>
              <td className="border p-3">{lead.email}</td>
              <td className="border p-3">
                <LeadStatusBadge status={lead.status} />
              </td>
            </tr>
          ))}

          {filteredLeads.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
