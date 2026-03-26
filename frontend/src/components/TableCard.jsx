import React from 'react';
import { CButton, CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { createBooking } from '../api';

export const TableCard = ({ spot }) => {
    const handleBook = async () => {
        const startTime = new Date();
        const endTime = new Date();
        endTime.setHours(startTime.getHours() + 2);

        try {
            const result = await createBooking({
                spot_id: spot.id,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString()
            });
            alert("Успешно забронировано!");
            window.location.reload();
        } catch (err) {
            alert("Ошибка при бронировании");
        }
    };

    return (
        <CCard style={{ width: '18rem', marginBottom: '10px' }}>
            <CCardBody>
                <CCardTitle>Стол №{spot.number}</CCardTitle>
                <CCardText>{spot.description}</CCardText>
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
