"use client";
import React, { useState } from "react";
import Home1 from "./home/page";
import Login from "./login/page";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }
    
    switch (currentPage) {
      case "home":
        return <Home1 />;
      default:
        return <Home1 />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}
