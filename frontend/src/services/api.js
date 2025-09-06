import axios from 'axios';

const api = axios.create({
  // Ensure you have this environment variable set in your .env file
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// This interceptor will attempt to refresh the JWT token on 401 Unauthorized responses.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 and if we haven't already retried the request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');

      // If there's no refresh token, the user can't get a new access token.
      // In this case, we'll log them out and redirect to the login page.
      if (!refreshToken) {
        localStorage.removeItem('access_token');
        delete api.defaults.headers.common['Authorization'];
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Request a new access token using the refresh token
        // Note: Your backend needs a '/api/auth/token/refresh/' endpoint for this to work.
        const response = await api.post('/api/auth/token/refresh/', {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Update the default Authorization header for subsequent requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        // Update the Authorization header on the original failed request
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        // Retry the original request with the new token
        return api(originalRequest);
      } catch (refreshError) {
        // If refreshing the token fails (e.g., it's expired or invalid), log the user out.
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete api.defaults.headers.common['Authorization'];

        // Redirect to login page to re-authenticate
        window.location.href = '/login';
        // Reject the promise to ensure the original caller knows the request failed.
        return Promise.reject(refreshError);
      }
    }

    // For any other errors, just reject the promise
    return Promise.reject(error);
  }
);

export default api;

