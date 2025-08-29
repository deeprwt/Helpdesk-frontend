"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import FileInput from "../input/FileInput";

interface SLA {
  id: string;
  name: string;
  responseTimeMins: number;
  resolutionTimeMins: number;
}

type UserType = {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
};

export default function CreateTicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [slaPolicies, setSlaPolicies] = useState<SLA[]>([]);
  const [slaPolicyId, setSlaPolicyId] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
const [user, setUser] = useState<UserType | null>(null);


  // Mock logged-in user (replace with real session/user)
  const createdById = "3bf2659f-9c4b-4649-8fbb-c219a7efef15";
  const createdByName = "Roshan Rwt";
  const createdByEmail = "rwtroshan28@gmail.com";

    // ✅ Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sla`)
      .then(async (res) => {
        const text = await res.text();
        return JSON.parse(text || "[]");
      })
      .then((data: SLA[]) => setSlaPolicies(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("SLA fetch error:", err);
        setSlaPolicies([]);
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setAttachments(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

        if (!user) {
      alert("❌ You must be logged in to create a ticket");
      return;
    }


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    formData.append("slaPolicyId", slaPolicyId);
   formData.append("userId", user.id);
    formData.append("userName", user.name || `${user.firstName || ""} ${user.lastName || ""}`);
    formData.append("userEmail", user.email);

    attachments.forEach((file) => formData.append("attachments", file));

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      alert("❌ Error creating ticket");
      return;
    }

    const result = await res.json();
    alert(`✅ Ticket #${result.ticket.id} created successfully!`);

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSlaPolicyId("");
    setAttachments([]);
  };

  return (
    <ComponentCard title="Create Support Ticket">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label>Subject</Label>
          <Input
            type="text"
            placeholder="Enter ticket subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(val) => setDescription(val)}
            rows={5}
            placeholder="Explain the issue"
          />
        </div>

        {/* Priority */}
        <div>
          <Label>Priority</Label>
          <Select
            options={[
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
              { value: "URGENT", label: "Urgent" },
            ]}
            placeholder="Select Priority"
            onChange={(val: string) => setPriority(val)}
          />
        </div>

        {/* SLA Policy */}
        <div>
          <Label>SLA Policy</Label>
          <Select
            options={slaPolicies.map((sla) => ({
              value: sla.id,
              label: `${sla.name} (Resp: ${sla.responseTimeMins}m, Res: ${sla.resolutionTimeMins}m)`,
            }))}
            placeholder="Select SLA Policy"
            onChange={(val: string) => setSlaPolicyId(val)}
          />
        </div>

        {/* Attachments */}
        <div>
          <Label>Attachments</Label>
          <FileInput onChange={handleFileChange} multiple />
          {attachments.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {attachments.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </ComponentCard>
  );
}
