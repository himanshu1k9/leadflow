import Header from "@/components/Header";
import LeadsPage from "./leads/page";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<p>Loading leads...</p>}>
      <LeadsPage />
    </Suspense>
  );
}
