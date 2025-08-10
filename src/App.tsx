"use client"
import Form from "./pages/Authentication";
import Dashboard from "./pages/TodoDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";


export default function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
      </Routes>
   </BrowserRouter>
  );
}
