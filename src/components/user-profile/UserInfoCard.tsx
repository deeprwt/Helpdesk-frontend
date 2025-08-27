"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

type UserProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
};

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include", // include cookies for token
          }
        );
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({ ...prev, ...data })); // fill from DB
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updates
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      setFormData(data); // update UI with fresh DB values
      closeModal();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          {/* Display profile values or blank */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs text-gray-500">First Name</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formData.firstName || "-"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500">Last Name</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formData.lastName || "-"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formData.email || "-"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formData.phone || "-"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs text-gray-500">Bio</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {formData.bio || "-"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:w-auto"
        >
          Edit
        </button>
      </div>

      {/* Modal for editing */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full max-w-[700px] rounded-3xl bg-white p-6 dark:bg-gray-900">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <form onSubmit={handleSave} className="flex flex-col">
            <div className="h-[450px] overflow-y-auto px-2 pb-3">
              {/* Social Links */}
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">
                Social Links
              </h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Facebook</Label>
                  <Input
                    name="facebook"
                    type="text"
                    value={formData.facebook || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Twitter</Label>
                  <Input
                    name="twitter"
                    type="text"
                    value={formData.twitter || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>LinkedIn</Label>
                  <Input
                    name="linkedin"
                    type="text"
                    value={formData.linkedin || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Instagram</Label>
                  <Input
                    name="instagram"
                    type="text"
                    value={formData.instagram || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Personal Info */}
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90">
                  Personal Information
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      value={formData.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      value={formData.lastName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      type="text"
                      value={formData.phone || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input
                      name="bio"
                      type="text"
                      value={formData.bio || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
