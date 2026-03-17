import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from './components/NavBar';
import AuthForm from './components/Auth-form';
import RegisterForm from './components/Register-form';
import CalendarPage from './components/CalendarPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
