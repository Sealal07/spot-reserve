import React, { useState, useEffect } from 'react';
import { getBookings, getSpots, addSpot, deleteSpot } from '../api';

export const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [allSpots, setAllSpots] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const spotData = {
            number: parseInt(formData.get('spotNumber')),
            description: formData.get('description')
        };

        try {
            await addSpot(spotData);
            alert("Стол добавлен");
            window.location.reload();
        } catch (error) {
            console.error("Ошибка при добавлении стола:", error);
        }
    };

    const handleDeleteSpot = async (id) => {
        if (confirm("Удалить этот стол?")) {
            try {
                await deleteSpot(id);
                fetchData();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Панель администратора</h2>

            <h3>Все бронирования</h3>
            <div>
                {allBookings.length > 0 ? allBookings.map(book => (
                    <div key={book.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
                        <p>Бронь №{book.id} | Стол ID: {book.spot_id}</p>
                        <p>{new Date(book.start_time).toLocaleString()} - {new Date(book.end_time).toLocaleString()}</p>
                    </div>
                )) : <p>Бронирований нет</p>}
            </div>

            <h3>Все столы</h3>
            <div>
                {allSpots.map(spot => (
                    <div key={spot.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span>Стол №{spot.number} — {spot.description}</span>
                        <button onClick={() => handleDeleteSpot(spot.id)}>🗑️</button>
                    </div>
                ))}
            </div>

            <h3>Добавить новый стол</h3>
            <form onSubmit={handleSubmit}>
                <input type="number" name='spotNumber' placeholder='Номер столика' required />
                <input type="text" name='description' placeholder='Описание столика' required />
                <button type='submit'>Добавить</button>
            </form>
        </div>
    );
};