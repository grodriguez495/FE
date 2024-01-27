
import useAuth from "hooks/useAuth";
import {Navigate, useNavigate,Outlet } from "react-router-dom";

export function ProtectedRoute  ()  {
    const navigate = useNavigate();
    const  isAuthenticated  = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
      //navigate("/admin/login");
     //window.location.href = "/admin/login";
    }

    return <Outlet />;
    
  };