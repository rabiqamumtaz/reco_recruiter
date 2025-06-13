import axios from "axios";
import { toast } from "react-toastify";
import store from "./store/index";

const api = axios.create({
  baseURL: "http://localhost:8000/api/recruiters",
  withCredentials: true,
  timeout: 10000,
});

let isRefreshingToken = false;
let refreshPromise = null;

api.interceptors.request.use(
  (config) => {
    const token = store.getState()?.recruiterAuth?.token;

    if (token && !config._silentRefresh && !config._skipAuth && !config._loginRequest && !config._verifyOtp) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip handling for logout requests
    if (originalRequest._isLogoutRequest) {
      return Promise.reject(error);
    }

    // Skip handling for silent refresh requests to prevent loops
    if (originalRequest._silentRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest._skipAuth) {
      originalRequest._retry = true;

      try {
        // Use a single refresh promise for all concurrent requests
        if (!refreshPromise && !isRefreshingToken) {
          isRefreshingToken = true;
          refreshPromise = api.get("/auth/refresh-token", {
            withCredentials: true,
            _silentRefresh: true,
          });
        }

        // Wait for the refresh promise if it exists
        if (refreshPromise) {
          const response = await refreshPromise;
          refreshPromise = null;
          isRefreshingToken = false;

          store.dispatch({
            type: "recruiterAuth/silentRefresh/fulfilled",
            payload: response.data,
          });

          return api(originalRequest);
        }
      } catch (refreshError) {
        refreshPromise = null;
        isRefreshingToken = false;

        // Only show toast for non-silent requests
        if (!originalRequest._silentRefresh) {
          toast.error("Session expired. Please login again.");
        }

        store.dispatch({ type: "recruiterAuth/logoutFulfilled" });

        // Only redirect if we're not already on the login page
        if (!window.location.href.includes("/login")) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;