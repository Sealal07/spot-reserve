import React, { useState } from "react";
import Calendar from 'react-calendar'
import TableCard from "./TableCard";

function CalendarPage() {

    const mockData = [
        {
            id: 1,
            number: 3,
            description: "Тестовое описание столика",
            isActive : true 
        },
        {
            id: 2,
            number: 5,
            description: "Тестовое описание столика 2",
            isActive : false 
        },
        {
            id: 3,
            number: 4,
            description: "Тестовое описание столика 3",
            isActive : true 
        }

    ]
    return (
        <>
            {mockData.map(spot => <TableCard key={spot.id} spot={spot} />)}
        {/* <Calendar></Calendar> */}
        </>
    )
    
};

export default CalendarPage