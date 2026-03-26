import React, { useState } from "react";
import { authRegister } from "../api";

function RegisterForm() {
    const [username, setUsername]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        try {
            const registerData = {
                login: username, // бэкенд ждет 'login', а не 'username'
                email: email,
                password: password,
                role: "user"     // Добавляем роль явно
            };

            const response = await authRegister(registerData);
            if (response) {

                alert("Регистрация успешна!")

            }
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            
        } catch (error) {

            alert("Ошибка: Неверные данные");
            
        };
    };

    return (

    <form onSubmit={handleSubmit}>

        <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Логин" 
        />


        <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
        />

        <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Пароль" 
        />

        <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Подтвердите пароль" 
        />

        <button type="submit">Зарегистрироваться</button>
    </form>

    )
};

export default RegisterForm
