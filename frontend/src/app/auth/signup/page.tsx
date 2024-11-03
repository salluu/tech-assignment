"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupValidationSchema } from "@/lib/validation/signupValidationSchema";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "@radix-ui/themes";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/api"; // Import the centralized axios instance
import { useRouter } from "next/navigation"; // Import the router to handle redirects

export default function SignupPage() {
  const [isProcessingSignup, setIsProcessingSignup] = useState(false);
  const router = useRouter(); // Initialize router

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupValidationSchema),
  });

  const onSubmit = async (data: any) => {
    setIsProcessingSignup(true);

    // Create a copy of data without confirmPassword
    const { confirmPassword, ...submitData } = data;

    try {
      // Use the centralized axios instance to send the POST request
      const response = await api.post("/api/auth/signup", submitData);
      
      // Show success message and log the response
      toast.success(response.data.message || "Signup successful!");
      console.log("Result:", response.data);

      // Redirect to login page after a delay
      setTimeout(() => {
        router.push("/auth/login"); // Redirect to login page
      }, 2000);
    } catch (error: any) {
      // Display the backend error message if available, otherwise a default message
      const errorMessage = error.response?.data?.message || "There was an error with your signup. Please try again.";
      toast.error(errorMessage);
      console.error("Error:", error);
    } finally {
      setIsProcessingSignup(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <div className="w-1/2 bg-gray-800 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold">Acme Inc</h1>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="text-gray-500 mb-6">Fill in the details below to create your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm" autoComplete="off">
          {/* Name Field */}
          <div>
            <Input
              type="text"
              placeholder="Name"
              {...register("name")}
              autoComplete="new-name"
              className="mb-1"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <Input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              autoComplete="new-email"
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
              autoComplete="new-password"
              className="mb-1"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              autoComplete="new-password"
              className="mb-1"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="flex items-center justify-center space-x-2 bg-black text-white py-2 mt-4" disabled={isProcessingSignup}>
            {isProcessingSignup ? (
              <>
                <Spinner size="2" loading={true} />
                <span>Processing...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </Button>
        </form>

        <div className="mt-6 text-sm">
          Already have an account? <a href="/auth/login" className="text-blue-500">Log in</a>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
