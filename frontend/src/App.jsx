import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import AuthForm from './components/Auth-form';
import RegisterForm from './components/Register-form';
import CalendarPage from './components/CalendarPage';
import { MyAccount } from "./components/MyAccount";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null); // Храним объект пользователя { token, role }

  // Проверяем наличие сессии при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      setUser({ token, role });
    }
  }, []);

  // Функция, которую вызовет AuthForm после успеха
  const login = (userData) => {
    setUser(userData);
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Передаем данные и функцию выхода в NavBar */}
      <NavBar user={user} onLogout={logout} />
      <main>
        <Routes>
          {/* Передаем функцию login в AuthForm */}
          <Route path="/login" element={<AuthForm onLogin={login} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/my" element={<MyAccount />}/>
          <Route path="/admin" element={<AdminDashboard />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;