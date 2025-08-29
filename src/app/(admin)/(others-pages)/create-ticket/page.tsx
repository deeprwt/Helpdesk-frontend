import { TicketCard } from "@/components/cards/TicketCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateTicketForm from "@/components/form/form-elements/CreateTicketForm";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function CreateTicketPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Ticket" />
      
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        {/* <SupportCard /> */}
        <TicketCard />
        {/* <BasicTableOne /> */}
        <CreateTicketForm />

      </div>
    </div>
    </div>
  );
}
