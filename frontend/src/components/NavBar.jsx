import {React, useState, useEffect} from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuth(true);
    }
  },[])
  
  useEffect(() => {
    localStorage.removeItem('token');
    setIsAuth(false);
  }, [])

  return (
    <nav>
      <div>
        <Link to="/"><strong>SpotReserve</strong></Link>
      </div>
      
      <ul>
        {isAuth ? (
          <>
        <li>
          <Link to="/calendar">Календарь</Link>
        </li>
        <li>
          <Link to="/my">Личный кабинет</Link>
        </li>
        <li>
          <Link to="/logout">Выйти</Link>
        </li>
          </>

        ) :
        (
          <>
        <li>
          <Link to="/login">Войти</Link>
        </li>
        <li>
          <Link to="/register">Регистрация</Link>
        </li>
          </>
        )}

      </ul>
    </nav>
  );
};


export default NavBar;
