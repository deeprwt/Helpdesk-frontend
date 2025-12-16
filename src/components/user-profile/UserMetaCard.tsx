"use client";
import React, { useEffect, useState } from "react";
// import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
import Image from "next/image";

type UserProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  role?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  avatar?: string;
};

export default function UserMetaCard() {
  // const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include", // include cookies if using JWT in cookie
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p>No user data found</p>;

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          {/* Profile Image */}
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <Image
              width={80}
              height={80}
              src={user.avatar || "/images/user/owner.jpg"}
              alt="user"
            />
          </div>

          {/* Name + Bio + Role */}
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {user.firstName || ""} {user.lastName || ""}
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.bio || "No bio"}
              </p>
              <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.role || "User"}
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
            {user.facebook && (
              <a href={user.facebook} target="_blank" rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <i className="fab fa-facebook"></i>
              </a>
            )}
            {user.twitter && (
              <a href={user.twitter} target="_blank" rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {user.instagram && (
              <a href={user.instagram} target="_blank" rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
