import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MemberManagement from "./pages/MemberManagement";
import BookManagement from "./pages/BookManagement";
import LendingFining from "./pages/LendingFining";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing"; 
import './App.css';

function App() {
  return (
   
       <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Protected Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" />
          <Route path="/dashboard/members"  />
          <Route path="/dashboard/books"  />
          <Route path="/dashboard/lending"  />
          <Route path="/dashboard/reports"  />
          <Route path="/dashboard/settings" />
          

          {/* Catch all incorrect routes or links (custom 404 page)*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  
  );
}

export default App;
