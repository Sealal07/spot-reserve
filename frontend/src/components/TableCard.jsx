import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardText, CCardTitle, CFormInput } from '@coreui/react';
import { createBooking } from '../api';

export const TableCard = ({ spot, selectedDate }) => {
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("18:00");

    const handleBook = async () => {
        // Склеиваем выбранную дату из календаря и время из инпутов
        const start = new Date(selectedDate);
        const [startH, startM] = startTime.split(':');
        start.setHours(startH, startM, 0);

        const end = new Date(selectedDate);
        const [endH, endM] = endTime.split(':');
        end.setHours(endH, endM, 0);

        try {
            const result = await createBooking({
                spot_id: spot.id,
                start_time: start.toISOString(),
                end_time: end.toISOString()
            });

            if (result.id) {
                alert("Успешно забронировано!");
                window.location.reload();
            } else {
                alert("Ошибка: " + (result.detail || "Место уже занято"));
            }
        } catch (err) {
            alert("Ошибка при бронировании");
        }
    };

    return (
        <CCard style={{ width: '18rem', marginBottom: '10px' }}>
            <CCardBody>
                <CCardTitle>Стол №{spot.number}</CCardTitle>
                <CCardText>{spot.description}</CCardText>

                <div className="mb-3">
                    <label>Начало:</label>
                    <CFormInput type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    <label>Конец:</label>
                    <CFormInput type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>

                <CButton
                    color={spot.is_active ? "primary" : "secondary"}
                    disabled={!spot.is_active}
                    onClick={handleBook}
                >
                    {spot.is_active ? "Забронировать" : "Место занято"}
                </CButton>
            </CCardBody>
        </CCard>
    );
}

export default TableCard;