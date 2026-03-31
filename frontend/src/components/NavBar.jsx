import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Принимаем пользователя и функцию выхода
function NavBar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px'}}>
      <Link to="/"><strong>SpotReserve</strong></Link>

      <ul style={{ display: 'flex', listStyle: 'none', gap: '15px' }}>
        {user ? ( // Если объект user существует  мы авторизованы
          <>
            <li><Link to="/calendar">Календарь</Link></li>
            <li><Link to="/my">Личный кабинет</Link></li>
            {/* Проверка роли напрямую из состояния */}
            {user.role === 'admin' && <li><Link to="/admin">Админ-панель</Link></li>}
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