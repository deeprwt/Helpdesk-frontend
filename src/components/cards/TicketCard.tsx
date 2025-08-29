"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
  Ticket,
  SolveIcon,
  LoadClockIcon,
} from "@/icons";

export const TicketCard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    hold: 0,
    reopen: 0,
    rejected: 0,
    solved: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/stats`, {
          method: "GET",
          credentials: "include", // if using cookies or session
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Failed to fetch ticket stats");
        }
      } catch (err) {
        console.error("Error fetching ticket stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading ticket stats...</p>;

  const cards = [
    { label: "Total tickets", value: stats.total, icon: <Ticket className="text-brand-500 dark:text-white/90" />, color: "brand" },
    { label: "Open tickets", value: stats.open, icon: <LoadClockIcon className="text-warning-500 dark:text-white/90" />, color: "warning" },
    { label: "In Progress", value: stats.inProgress, icon: <SolveIcon className="text-success-500 dark:text-white/90" />, color: "success" },
    { label: "Hold tickets", value: stats.hold, icon: <Ticket className="text-brand-500 dark:text-white/90" />, color: "brand" },
    { label: "Reopen tickets", value: stats.reopen, icon: <LoadClockIcon className="text-warning-500 dark:text-white/90" />, color: "warning" },
    { label: "Rejected tickets", value: stats.rejected, icon: <SolveIcon className="text-success-500 dark:text-white/90" />, color: "success" },
    { label: "Solved tickets", value: stats.solved, icon: <SolveIcon className="text-success-500 dark:text-white/90" />, color: "success" },
    { label: "Closed tickets", value: stats.closed, icon: <SolveIcon className="text-success-500 dark:text-white/90" />, color: "success" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
      {cards.map((card, idx) => (
        <article
          key={idx}
          className="flex gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div
            className={`bg-${card.color}-500/10 text-${card.color}-500 inline-flex h-14 w-14 items-center justify-center rounded-xl`}
          >
            {card.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-title-xs mb-1 font-semibold text-gray-800 dark:text-white/90">
              {card.value.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
