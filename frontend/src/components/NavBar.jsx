import React from "react";
import { Link } from "react-router";

tion NavBar() {
  return (
    <nav>
      <div>
        <Link to="/"><strong>SpotReserve</strong></Link>
      </div>
      
      <ul>
        <li>
          <Link to="/calendar">Календарь</Link>
        </li>
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
      </ul>
    </nav>
  );
}


export default NavBar;
