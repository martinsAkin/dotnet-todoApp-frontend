import type { JSX } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => { 
      const isLoggedIn = localStorage.getItem("loggedIn") === "true";
      return isLoggedIn ? children : <Navigate to='/' />
};

export default ProtectedRoute;
