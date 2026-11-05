import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "LeadFlow",
  description: "Lead Monitoring Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
