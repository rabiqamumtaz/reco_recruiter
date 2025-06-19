import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null,
  pendingVerification: false,
  verificationEmail: null,
};

const recruiterAuthSlice = createSlice({
  name: 'recruiterAuth',
  initialState,
  reducers: {
    loginInitiated: (state, action) => {
      state.pendingVerification = true;
      state.verificationEmail = action.payload.email;
    },
    logoutFulfilled: (state) => {
      state.isAuthenticated = false;
      state.recruiter = null;
      state.token = null;
      state.error = null;
      state.pendingVerification = false;
      state.verificationEmail = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase('recruiterAuth/loginRecruiter/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('recruiterAuth/loginRecruiter/fulfilled', (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.pendingVerification = false;
      })
      .addCase('recruiterAuth/loginRecruiter/rejected', (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload;
        state.pendingVerification = false;
      })
      
      // Registration cases
      .addCase('recruiterAuth/registerRecruiter/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('recruiterAuth/registerRecruiter/fulfilled', (state, action) => {
        state.loading = false;
        state.pendingVerification = true;
        state.verificationEmail = action.payload.email;
      })
      .addCase('recruiterAuth/registerRecruiter/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pendingVerification = false;
      })
      
      // Silent refresh cases
      .addCase('recruiterAuth/silentRefresh/pending', (state) => {
        state.loading = true;
      })
      .addCase('recruiterAuth/silentRefresh/fulfilled', (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.recruiter = action.payload.recruiter;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase('recruiterAuth/silentRefresh/rejected', (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.recruiter = null;
        state.token = null;
      })
      
      // OTP verification cases
      .addCase('recruiterAuth/verifyOtp/pending', (state) => {
        state.loading = true;
      })
      .addCase('recruiterAuth/verifyOtp/fulfilled', (state, action) => {
        state.isAuthenticated = true;
        state.recruiter = action.payload.recruiter;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
        state.pendingVerification = false;
        state.verificationEmail = null;
      })
      .addCase('recruiterAuth/verifyOtp/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  loginInitiated,
  logoutFulfilled
} = recruiterAuthSlice.actions;

export default recruiterAuthSlice.reducer;