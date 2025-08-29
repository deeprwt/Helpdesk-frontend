import { TicketCard } from "@/components/cards/TicketCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import TicketTable from "@/components/tables/TicketTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function ViewTicketPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="View Ticket" />
      
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        {/* <SupportCard /> */}
        <TicketCard />
        {/* <BasicTableOne /> */}
        <TicketTable />

      </div>
    </div>
    </div>
  );
}
