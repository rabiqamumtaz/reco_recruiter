import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axios';

export const registerRecruiter = createAsyncThunk(
  'recruiterAuth/registerRecruiter',
  async (formData, { rejectWithValue }) => {
    try {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== undefined) {
          form.append(key, formData[key]);
        }
      }

      const response = await api.post('/users/auth/register', form, {
        headers: { "Content-Type": "multipart/form-data" },
        _skipAuth: true,
      });

      return {
        email: response.data.email,
        name: response.data.name,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);

export const loginRecruiter = createAsyncThunk(
  "recruiterAuth/loginRecruiter",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/auth/login", { email, password }, {
        _skipAuth: true,
      });
      // console.log(response.data)
      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const silentRefresh = createAsyncThunk(
  'recruiterAuth/silentRefresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/auth/refresh-token', {
        withCredentials: true,
        _silentRefresh: true
      });

      if (!response.data.accessToken || !response.data.recruiter) {
        return rejectWithValue("No valid session");
      }

      return {
        recruiter: response.data.recruiter,
        token: response.data.accessToken,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Session expired");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'recruiterAuth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/auth/verify-otp', { email, otp }, {
        _skipAuth: true
      });

      return {
        recruiter: response.data.recruiter,
        token: response.data.token,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP verification failed");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "recruiterAuth/resendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/auth/resend-otp", { email }, {
        _skipAuth: true,
      });
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend OTP");
    }
  }
);

export const logoutRecruiter = createAsyncThunk(
  'recruiterAuth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/users/auth/logout', {}, {
        withCredentials: true,
        _skipAuth: true,
        _isLogoutRequest: true
      });
    } catch (err) {
      console.warn("Logout failed:", err.message);
    }
  }
);