import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Request Interceptor: Attach access token to requests
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response Interceptor: Handle token refresh on 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the error is 401 and the original request was not to /auth/login
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/login')) {
      originalRequest._retry = true; // Avoid looping

      try {
        // Send request to refresh endpoint
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh`, {}, {
          withCredentials: true, // Sends the HTTP-only refresh token cookie
        });

        // Store new access token in localStorage
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token expired or invalid", refreshError);

        // Clear tokens if refresh fails
        localStorage.removeItem("accessToken");
        // Optional: trigger a logout or redirect to login page
        // window.location.href = '/login'; // Uncomment this if redirection is required
      }
    }

    // If 401 and it’s from login, or refresh failed, or other errors
    return Promise.reject(error);
  }
);

export default api;
