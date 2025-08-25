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
import Landing from "./pages/Landing"; 
import './App.css';

function App() {
  return (
   
       <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Protected Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/members" element={<MemberManagement />} />
          <Route path="/dashboard/books" element={<BookManagement />} />
          <Route path="/dashboard/lending" element={<LendingFining />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          

          {/* Catch all incorrect routes or links (custom 404 page)*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  
  );
}

export default App;
