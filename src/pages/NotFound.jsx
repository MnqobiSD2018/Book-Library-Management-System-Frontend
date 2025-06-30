import React from "react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-800">404</h1>
                <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
                <a href="/" className="mt-6 inline-block text-blue-600 hover:underline">
                     Go back to Home
                </a>
            </div>
        </div>    
    );
};

export default NotFound;