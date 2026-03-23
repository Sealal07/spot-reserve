import React, { useState, useEffect } from 'react';
import { getBookings, getSpots } from '../api';

export const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [allSpots, setAllSpots] = useState([]);
    const [loading, setLoading] = useState(true);

    // исправлено: используем useEffect для загрузки данных при монтировании
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsData, spotsData] = await Promise.all([
                    getBookings(),
                    getSpots()
                ]);
                setAllBookings(Array.isArray(bookingsData) ? bookingsData : []);
                setAllSpots(Array.isArray(spotsData) ? spotsData : []);
            } catch (error) {
                console.error("Ошибка загрузки данных админа:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Загрузка данных...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Панель администратора</h2>
            
            <h3>Все бронирования</h3>
            <div className="bookings-list">
                {allBookings.length > 0 ? allBookings.map(book => (
                    <div key={book.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        {/* исправлено: берем данные из объекта бронирования */}
                        <h4>Бронь №{book.id}</h4>
                        <p>Стол: {book.spot_id}</p>
                        <p>Период: {new Date(book.start_time).toLocaleString()} - {new Date(book.end_time).toLocaleString()}</p>
                    </div>
                )) : <p>Бронирований нет</p>}
            </div>

            <h3>Все столы</h3>
            <div className="spots-list">
                {allSpots.map(spot => (
                    <div key={spot.id}>
                        Стол №{spot.number} — {spot.description}
                    </div>
                ))}
            </div>
        </div>
    );
};
