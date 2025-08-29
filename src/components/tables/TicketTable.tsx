"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Types
type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
};

type Attachment = {
  id: string;
  fileUrl: string;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdBy: User;
  assignedTo?: User;
  attachments: Attachment[];
  createdAt: string;
};

// Pagination Props
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-4 p-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? "bg-blue-500 text-white border-blue-500"
              : "border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

// Ticket Table Component
export default function TicketTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // tickets per page

  // Fetch tickets
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tickets?page=${page}&limit=${limit}`
        );
        if (res.ok) {
          const data = await res.json();
          setTickets(data.tickets);
          setTotalPages(data.totalPages);
        }
      } catch (err) {
        console.error("Error fetching tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [page]);

  if (loading) return <p>Loading tickets...</p>;
  if (tickets.length === 0) return <p>No tickets found.</p>;

  return (
    <>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 p-4  sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
           All Tickets
          </h3>
        </div>

        <div className="flex items-center gap-3 ">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      </div>
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]"> 
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell                   isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">User</TableCell>
                                  <TableCell                   isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Ticket ID</TableCell>
                <TableCell isHeader
                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                 >Title</TableCell>
                <TableCell isHeader
                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                 >Status</TableCell>
                <TableCell isHeader
                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                 >Priority</TableCell>
                <TableCell isHeader
                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                 >Assigned To</TableCell>
                <TableCell isHeader
                 className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                 >Attachments</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                                      <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={ticket.createdBy.avatar || "/images/user/owner.jpg"}
                          alt={ticket.createdBy.firstName || ticket.createdBy.email}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {ticket.createdBy.firstName || ""}{" "}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                         {ticket.createdBy.lastName || ""}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                                                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {ticket.id}
                  </TableCell>
                                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {ticket.title}</TableCell>
                                   <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                 
                    <Badge
                      size="sm"
                      color={
                        ticket.status === "OPEN"
                          ? "warning"
                          : ticket.status === "IN_PROGRESS"
                          ? "info"
                          : ticket.status === "RESOLVED"
                          ? "success"
                          : "light"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">                  
                    <Badge
                      size="sm"
                      color={
                        ticket.priority === "HIGH"
                          ? "error"
                          : ticket.priority === "MEDIUM"
                          ? "warning"
                          : "success"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {ticket.assignedTo
                      ? `${ticket.assignedTo.firstName || ""} ${
                          ticket.assignedTo.lastName || ""
                        }`
                      : "Unassigned"}
                  </TableCell>
                   <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {ticket.attachments.length} file
                    {ticket.attachments.length > 1 ? "s" : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
    </>
  );
}
