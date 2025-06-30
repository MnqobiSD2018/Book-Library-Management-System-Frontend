import React from "react";
import logo from "../assets/logo.svg";
import heroImage from "../assets/98.jpg"; 
import { Link } from "react-router-dom";
import { BookOpenIcon, UserGroupIcon, ShieldCheckIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

const Landing = () => {
  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-blue-100 via-white to-blue-50 overflow-x-hidden">
      {/* Animated Gradient or Shape Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400 rounded-full opacity-20 blur-2xl animate-pulse" />
      </div>
      <header className="relative z-10 bg-white/80 shadow-md py-4 px-6 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center space-x-3">
            <img src={logo} alt="Library Logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Book Library System</h1>
        </div>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Login
        </Link>
      </header>

      <section className="relative z-10 py-20 px-6 flex flex-col-reverse lg:flex-row items-center justify-center max-w-6xl mx-auto gap-10">
        <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3 leading-tight drop-shadow">Your Complete Library Management Solution</h2>
            <p className="text-lg md:text-xl text-blue-700 font-medium mb-2 animate-fade-in">Modern. Secure. Effortless.</p>
            <p className="text-lg text-gray-600 mb-6 animate-fade-in delay-100">
                Efficiently manage books, members, loans, and fines — all in one secure and user-friendly platform.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-7 py-3 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-lg transition-transform duration-200 shadow">
                <BookOpenIcon className="h-6 w-6" />
                Try the Demo
            </Link>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
            <div className="relative group">
              <img src={heroImage} alt="Library Hero" className="rounded-3xl shadow-2xl w-full max-w-md h-auto border-4 border-white group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-blue-200 rounded-full blur-xl opacity-60" />
            </div>
        </div>
      </section>

      {/* Features Section with background pattern */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-2xl -z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-14 tracking-tight">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FeatureCard
              icon={<ShieldCheckIcon className="h-12 w-12 text-blue-600" />}
              title="Secure Authentication"
              description="Login with secure credentials. Librarians only. Passwords are hashed using bcrypt."
              accent="from-blue-400 to-blue-600"
            />
            <FeatureCard
              icon={<UserGroupIcon className="h-12 w-12 text-blue-600" />}
              title="Member Management"
              description="CRUD operations with validations for unique emails and phones. Auto membership date tracking."
              accent="from-green-400 to-blue-400"
            />
            <FeatureCard
              icon={<BookOpenIcon className="h-12 w-12 text-blue-600" />}
              title="Book & Copy Tracking"
              description="Manage metadata and book copies with real-time availability and copy-level lending tracking."
              accent="from-purple-400 to-blue-400"
            />
            <FeatureCard
              icon={<DocumentCheckIcon className="h-12 w-12 text-blue-600" />}
              title="Reports & Fines"
              description="Track overdue books, auto-calculate fines, and generate detailed member and loan reports."
              accent="from-pink-400 to-blue-400"
            />
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-white/90 mt-16 py-8 text-center text-sm text-gray-500 border-t flex flex-col items-center gap-2">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:text-blue-600 transition" title="Contact">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0v.668c0 .414-.336.75-.75.75H3.75a.75.75 0 01-.75-.75V6.75m19.5 0v.668M2.25 6.75v.668" />
            </svg>
          </a>
          <a href="#" className="hover:text-blue-600 transition" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.302 2.788 7.946 6.652 9.24.486.09.664-.211.664-.47 0-.232-.008-.846-.013-1.66-2.705.587-3.276-1.304-3.276-1.304-.442-1.123-1.08-1.422-1.08-1.422-.883-.604.067-.592.067-.592  .976.069 1.49 1.003 1.49 1.003.868 1.488 2.277 1.059 2.834.81.088-.629.34-1.06.618-1.304-2.16-.246-4.432-1.08-4.432-4.807 0-1.062.38-1.93 1.003-2.61-.101-.247-.435-1.24.096-2.586 0 0 .816-.262 2.676 1.001A9.36 9.36 0 0112 6.844c.827.004 1.66.112 2.438.328 1.86-1.263 2.675-1.001 2.675-1.001.532 1.346.198 2.339.098 2.586.624.68 1.002 1.548 1.002 2.61 0 3.735-2.274 4.558-4.44 4.8.35.302.66.899.66 1.814 0 1.31-.012 2.367-.012 2.69 0 .26.176.563.67.468C18.965 19.944 21.75 16.302 21.75 12c0-5.385-4.365-9.75-9.75-9.75z" />
            </svg>
          </a>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-blue-200 via-blue-100 to-white mb-2" />
        © {new Date().getFullYear()} Book Library Management System. Built for the Full-Stack Coding Challenge.
      </footer>
    </div>
  );
};

// Enhanced FeatureCard with accent bar and hover effect
const FeatureCard = ({ icon, title, description, accent }) => (
  <div className="relative bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300 group border border-blue-100">
    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-gradient-to-r ${accent} mb-4 group-hover:scale-110 transition`} />
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold text-gray-700 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default Landing;
