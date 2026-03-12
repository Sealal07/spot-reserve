import React, { useState } from "react";

function AuthForm() {
    const [username, setUsername]  = useState('');
    const  [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

