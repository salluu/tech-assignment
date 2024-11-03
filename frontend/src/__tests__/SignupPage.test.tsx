import React from 'react';
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SignupPage from "@/app/auth/signup/page";
import { ToastContainer } from "react-toastify";
import api from "@/lib/api";

jest.mock('@/lib/api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(jest.fn());
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

describe("SignupPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders signup form and allows form submission", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("name@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password@123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Password@123" } });

      (api.post as jest.Mock).mockResolvedValue({
        data: { message: "User registered successfully" }
      });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/auth/signup", {
        name: "John Doe",
        email: "john@example.com",
        password: "Password@123",
      });
      expect(screen.getByText(/User registered successfully/i)).toBeInTheDocument();
    });
  });

  it("displays validation errors when inputs are invalid", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(screen.getByText("Confirm Password is required")).toBeInTheDocument();
    });
  });

  it("displays password-specific validation errors progressively", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    // Initially leaving password empty to trigger "Password is required"
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(await screen.findByText("Password is required")).toBeInTheDocument();

    // Enter a short password to trigger the minimum length validation
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "123" } });
    });
    expect(await screen.findByText("Password must be at least 8 characters")).toBeInTheDocument();

    // Enter a password with enough length but missing uppercase letters
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "abcdefgh" } });
    });
    expect(await screen.findByText("Password must contain at least one uppercase letter")).toBeInTheDocument();

    // Enter a password with uppercase but missing numbers
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "Abcdefgh" } });
    });
    expect(await screen.findByText("Password must contain at least one number")).toBeInTheDocument();

    // Enter a password with number but missing special character
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "Abcdefg1" } });
    });
    expect(await screen.findByText("Password must contain at least one special character")).toBeInTheDocument();

    // Enter a fully valid password to clear the error
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "Abcdefg1!" } });
    });
    await waitFor(() => {
      expect(screen.queryByText("Password is required")).not.toBeInTheDocument();
      expect(screen.queryByText(/Password must/)).not.toBeInTheDocument(); // No validation messages should remain
    });
  });

  it("displays error when passwords do not match", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("name@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password@123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Password123" } });
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Passwords must match")).toBeInTheDocument();
  });

  it("displays API error message on server error response", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("name@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password@123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Password@123" } });

      (api.post as jest.Mock).mockRejectedValue({
        response: { data: { message: "Email is already taken" } }
      });

      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("Email is already taken")).toBeInTheDocument();
  });

  it("displays a generic error message if the server response is missing an error message", async () => {
    render(
      <>
        <ToastContainer />
        <SignupPage />
      </>
    );

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("name@example.com");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "Password@123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "Password@123" } });

      (api.post as jest.Mock).mockRejectedValue({});

      fireEvent.click(submitButton);
    });

    expect(await screen.findByText("There was an error with your signup. Please try again.")).toBeInTheDocument();
  });
});
