"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/lib/validation/loginValidationSchema";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@radix-ui/themes";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/api"; // Import the centralized axios instance
import { useRouter } from "next/navigation"; // Import the router to handle redirects

export default function LoginPage() {
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsProcessingLogin(true);

    try {
      // Use the centralized axios instance to send the POST request
      const response = await api.post("/api/auth/login", data);
      
      // Show success message and log the response
      toast.success(response.data.message || "Login successful!");
      console.log("Login Result:", response.data);

      // Store access token in localStorage
      localStorage.setItem("accessToken", response.data.accessToken);

      // Redirect to the dashboard after 2 seconds
      setTimeout(() => {
        router.push("/app");
      }, 1000);
    } catch (error: any) {
      // Display the backend error message if available
      const errorMessage = error.response?.data?.message || "There was an error with your login. Please try again.";
      toast.error(errorMessage);
      console.error("Login Error:", error);
    } finally {
      setIsProcessingLogin(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      {/* Left Section with Branding */}
      <div className="w-1/2 bg-gray-800 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold">Acme Inc</h1>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-2">Log in to your account</h2>
        <p className="text-gray-500 mb-6">Enter your credentials below to access your account.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
          {/* Email Field */}
          <div>
            <Input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              autoComplete="username"
              required
              className="mb-1"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
              autoComplete="current-password"
              required
              className="mb-1"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="flex items-center justify-center space-x-2 bg-black text-white py-2 mt-4" disabled={isProcessingLogin}>
            {isProcessingLogin ? (
              <>
                <Spinner size="2" loading={true} />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Log In</span>
            )}
          </Button>
        </form>

        {/* Link to Signup Page */}
        <div className="mt-6 text-sm">
          Don’t have an account? <a href="/auth/signup" className="text-blue-500">Sign up</a>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By logging in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
