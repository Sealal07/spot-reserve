import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import TableCard from "./TableCard";
import { getSpots } from "../api"; 
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [error, setError] = useState(null);

    const fetchSpots = async () => {
        try {
            setLoading(true);
            const data = await getSpots();
            // проверяем, что пришел массив
            if (Array.isArray(data)) {
                setSpots(data);
                setError(null);
            } else {
                console.error("Сервер вернул не массив:", data);
                setSpots([]);
                setError("Ошибка формата данных от сервера");
            }
        } catch (err) {
            setError("Не удалось загрузить список столов.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpots();
    }, []);

    const availableSpots = spots.filter(spot => spot.is_active !== false);

    return (
        <div className="calendar-container">
            <h2>Выберите дату для бронирования</h2>
            
            <Calendar 
                onChange={setSelectedDate}
                value={selectedDate}
                minDate={new Date()} 
            />

            <div className="spots-section">
                <h3>Доступные места на {selectedDate.toLocaleDateString()}</h3>
                {loading && <p>Загрузка рабочих мест...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && !error && (
                    availableSpots.length > 0 ? (
                        <div className="spots-grid">
                            {availableSpots.map(spot => (
                                <TableCard key={spot.id} spot={spot}  selectedDate={selectedDate}/>
                            ))}
                        </div>
                    ) : (
                        <p>К сожалению, на выбранную дату нет доступных столов.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
