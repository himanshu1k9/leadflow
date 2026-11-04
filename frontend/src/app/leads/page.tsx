"use-client";

import { useCallback, useMemo, useRef, useState } from "react";

interface Lead {
  id: number;
  name: string;
  email: string;
  status: "new" | "converted" | "pending";
}

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    status: "new",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@gmail.com",
    status: "converted",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@gmail.com",
    status: "pending",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  /**
   * using useRef
   */
  const searchRef = useRef<HTMLInputElement>(null);

  /**
   * Memorising filtered calculations
   */
  const filterLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchedSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase());
      const matchedStatus = status === "all" || lead.status === status;
      return matchedSearch && matchedStatus;
    });
  }, [leads, search, status]);

  /**
   * calculating converted leads
   */
  const conveertedCounts = useMemo(() => {
    return leads.filter((lead) => lead.status === "converted").length;
  }, [leads]);

  /**
   * Conversion percentage
   */
  const conversionRate = useMemo(() => {
    if (leads.length === 0) return 0;
    return (conveertedCounts / leads.length) * 100;
  }, [conveertedCounts, leads.length]);

  // add lead
  const handleAddLead = useCallback(() => {
    const newLead: Lead = {
      id: Date.now(),
      name: `New Lead ${leads.length + 1}`,
      email: `lead${Date.now()}@gmail.com`,
      status: "new",
    };

    setLeads((prev) => [...prev, newLead]);
    searchRef.current?.focus();
  }, [leads.length]);

  // delete lead
  const handleDeleteLead = useCallback((id: number) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, []);

  //   function addLead() {
  //     const newLead: Lead = {
  //       id: Date.now(),
  //       name: "New Lead",
  //       email: "example@gmail.com",
  //       status: "new",
  //     };

  //     setLeads((previousLeads) => [...previousLeads, newLead]);
  //   }

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <button
          onClick={handleAddLead}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Lead
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border p-4 rounded">
          <p>Total Leads</p>
          <h2 className="text-2xl font-bold">{leads.length}</h2>
        </div>
        <div className="border p-4 rounded">
          <p>Converted Leads</p>
          <h2 className="text-2xl font-bold">{conveertedCounts}</h2>
        </div>
        <div className="border p-4 rounded">
          <p>Conversion Rate</p>
          <h2 className="text-2xl font-bold">{conversionRate.toFixed(2)}%</h2>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          ref={searchRef}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search leads"
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

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">ID</th>
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Status</th>
            <th className="border p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filterLeads.map((lead) => (
            <tr key={lead.id}>
              <td className="border p-3">{lead.id}</td>
              <td className="border p-3">{lead.name}</td>
              <td className="border p-3">{lead.email}</td>
              <td className="border p-3">{lead.status}</td>
              <td className="border p-3">
                <button
                  onClick={() => handleDeleteLead(lead.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filterLeads.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No leads found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
