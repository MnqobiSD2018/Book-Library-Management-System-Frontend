import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MemberManagement from "./pages/MemberManagement";
import BookManagement from "./pages/BookManagement";
import LendingFining from "./pages/LendingFining";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
   
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/members" element={<ProtectedRoute><MemberManagement /></ProtectedRoute>} />
          <Route path="/dashboard/books" element={<ProtectedRoute><BookManagement /></ProtectedRoute>} />
          <Route path="/dashboard/lending" element={<ProtectedRoute><LendingFining /></ProtectedRoute>} />
          <Route path="/dashboard/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Catch all incorrect routes or links (custom 404 page)*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  
  );
}

export default App;
