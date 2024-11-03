"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserData {
  name: string;
  email: string;
}

export default function AppPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/api/auth/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Session expired. Please log in again.");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      // Clear tokens
      localStorage.removeItem("accessToken");

      // Optionally, clear refresh token by calling a logout endpoint if needed
      api.post("/api/auth/logout").catch((error) =>
        console.error("Failed to log out:", error)
      );

      // Redirect to login
      toast.success("You have been logged out.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <ToastContainer />
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
          <p>Hello, {userData?.name || "User"}!</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow p-8">
        <h2 className="text-xl font-semibold mb-4">Your Dashboard Overview</h2>
        <p>Here’s a summary of your recent activities, settings, and other relevant information.</p>
      </main>

      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
