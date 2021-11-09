import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeView from "./Views/HomeView";
import RegisterView from "./Views/RegisterView";
import LoginView from "./Views/LoginView";
import DashboardView from "./Views/DashboardView";
import UserSettingsView from "./Views/UserSettingsView";
import AddTransactionView from "./Views/AddTransactionView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-transaction" element={<AddTransactionView />} />
        <Route path="/user-settings" element={<UserSettingsView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </Router>
  );
}

export default App;
