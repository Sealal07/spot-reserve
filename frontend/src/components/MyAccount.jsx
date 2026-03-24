import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../api';

export const MyAccount = () => {
    const [bookings, setBookings] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('token'));
    const role = localStorage.getItem('role');

    // исправлено: загрузка данных через useEffect
    useEffect(() => {
        if (isAuthorized) {
            getMyBookings()
                .then(data => {
                    if (Array.isArray(data)) {
                        setBookings(data);
                    }
                })
                .catch(err => console.error("Ошибка получения броней:", err));
        }
    }, [isAuthorized]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Личный кабинет</h1>
            <p>Ваша роль: {role || 'Гость'}</p>

            {!isAuthorized ? (
                <p>У вас нет доступа. Пожалуйста, войдите в систему.</p>
            ) : (
                <>
                    <h3>Мои бронирования:</h3>
                    {bookings.length > 0 ? (
                        <ul>
                            {bookings.map((element) => (
                                <li key={element.id} style={{ marginBottom: '15px' }}>
                                    <strong>Стол №{element.spot_id}</strong>
                                    <br />
                                    <span>
                                        {new Date(element.start_time).toLocaleString()} — 
                                        {new Date(element.end_time).toLocaleString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>У вас пока нет активных бронирований.</p>
                    )}
                </>
            )}
        </div>
    );
};
