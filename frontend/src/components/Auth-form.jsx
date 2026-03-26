import React, { useState } from "react";
import { authToken, getUsers } from "../api";
import { useNavigate } from "react-router-dom";

function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = async () => {
        try {
            const userResponse = await getUsers();
            // исправлено: бэкенд возвращает объект с ролью 
            if (userResponse && userResponse.role) {
                localStorage.setItem("role", userResponse.role);
            } else {
                localStorage.setItem("role", "user"); // fallback
            }
            navigate("/my"); // перенаправляем в ЛК после успеха
        } catch (e) {
            console.error("Ошибка получения профиля", e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authToken({
                username: username,
                password: password
            });
            
            if (response.access_token) {
                localStorage.setItem("token", response.access_token);
                await handleAuth();
                alert("Успешный вход!");
            } else {
                alert("Ошибка: " + (response.detail || "Неверные данные"));
            }
        } catch (error) {
            alert("Ошибка при авторизации!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border border-cyan-600 rounded-2xl p-5 flex flex-col gap-4 text-xl">
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Email (Логин)" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Пароль" 
            />
            <button type="submit" className="border text-amber-50 p-2 rounded-xl bg-linear-to-t from-sky-500 to-indigo-500">Войти</button>
        </form>
    );
};

export default AuthForm;
