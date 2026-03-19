import React, { useState } from "react";
import { authToken, getUsers } from "../api";

function AuthForm() {
    const [username, setUsername]  = useState('');
    const  [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {



            const response = await authToken({
                username: username,
                password: password
            });
            if (response.access_token) {
                localStorage.setItem("token", response.access_token)
                handleAuth()
            }

            
        } catch (error) {

            alert("Ошибка при авторизации!")
            
        }


    };

    const handleAuth = async (e) => {

        const response = await getUsers()

        if (response) {
            localStorage.setItem("role", response.role)
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Логин" 
        />

        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Пароль" 
        />

        <button type="submit">Войти</button>
    </form>

    )
};

export default AuthForm

