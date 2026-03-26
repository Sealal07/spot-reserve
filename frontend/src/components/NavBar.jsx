import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [isAuth, setIsAuth] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // следим за наличием токена
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="flex w-full justify-between mx-20 items-center">
      <Link to="/"><strong>SpotReserve</strong></Link>

      <ul className="flex gap-20">
        {isAuth ? (
          <>
            <li><Link to="/calendar">Календарь</Link></li>
            <li><Link to="/my">Личный кабинет</Link></li>
            {/* показываем админку только если роль admin */}
            {role === 'admin' && <li><Link to="/admin">Админ-панель</Link></li>}
            <li><button onClick={handleLogout}>Выйти</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Войти</Link></li>
            <li><Link to="/register">Регистрация</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
