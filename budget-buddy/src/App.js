import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeView from "./views/HomeView";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import UserSettingsView from "./views/UserSettingsView";
import AddTransactionView from "./views/AddTransactionView";

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
