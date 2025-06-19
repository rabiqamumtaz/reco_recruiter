import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import JobListings from "./pages/JobListings"
import Feedback from "./pages/Feedback"
import JobDetail from "./pages/JobDetail"
import Login from "./pages/auth/Login"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/auth/SignUp"
import PrivateRoute from "./components/PrivateRoutes"
import PublicRoute from "./components/PublicRoutes"
import useAutoLogin from "./hooks/useAutoLogin"
import useTokenRefresh from "./hooks/useTokenRefresh"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const queryClient = new QueryClient();

    useAutoLogin();
    useTokenRefresh();
  return (
         <QueryClientProvider client={queryClient}>
      {/* Your Routes or Components */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        limit={1}
      />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

          {/* Private routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout><Dashboard /></Layout>
            </PrivateRoute>
          } />
          <Route path="/job-listings" element={
            <PrivateRoute>
              <Layout><JobListings /></Layout>
            </PrivateRoute>
          } />
          <Route path="/feedback" element={
            <PrivateRoute>
              <Layout><Feedback /></Layout>
            </PrivateRoute>
          } />
          <Route path="/job/:id" element={
            <PrivateRoute>
              <Layout><JobDetail /></Layout>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}


export default App
