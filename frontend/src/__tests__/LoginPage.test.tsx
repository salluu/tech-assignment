import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";
import { ToastContainer } from "react-toastify";
import api from "@/lib/api"; // Mocked Axios instance

jest.mock('@/lib/api'); // Mock API requests

describe("LoginPage Component", () => {
  it("renders login form and allows form submission", async () => {
    // Render the component with ToastContainer for toast messages
    render(
      <>
        <ToastContainer />
        <LoginPage />
      </>
    );

    // Check for input fields and button
    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole("button", { name: /Log In/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Mock successful login response
    (api.post as jest.Mock).mockResolvedValue({ data: { accessToken: "mockToken" } });

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/auth/login", {
        email: "user@example.com",
        password: "password123",
      });
      expect(screen.getByText(/Login successful!/i)).toBeInTheDocument();
    });
  });
});
