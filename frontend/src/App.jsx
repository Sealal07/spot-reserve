import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import AuthForm from './components/Auth-form';
import RegisterForm from './components/Register-form';
import CalendarPage from './components/CalendarPage';
import { MyAccount } from "./components/MyAccount";
import { AdminDashboard } from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
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
