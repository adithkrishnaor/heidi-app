"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home1 from "./home/page";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("home");
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home1 />;
      default:
        return <Home1 />;
    }
  };
  return (
    <div>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
