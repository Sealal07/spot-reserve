import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import AuthForm from './components/Auth-form';
import RegisterForm from './components/Register-form';
import CalendarPage from './components/CalendarPage';
import { MyAccount } from "./components/MyAccount";
import { AdminDashboard } from "./components/AdminDashboard";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
    <header className="bg-linear-to-t from-sky-500 to-indigo-500 sticky font-bold w-full flex text-center h-20 align-center">
      <NavBar className="" />
    </header>
    <main className="mt-30 mx-auto w-100">
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
