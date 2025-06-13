import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.recruiterAuth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
        <Spin size="large" tip="Checking session..." />
      </div>
    );
  }

  return isAuthenticated ?
    <Navigate to={location.state?.from || "/dashboard"} replace />
    : children;
};

export default PublicRoute;