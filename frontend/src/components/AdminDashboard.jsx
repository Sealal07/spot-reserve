import React, { useState } from 'react';
import TableCard from './TableCard';
import { getUsers, getBookings, getSpots, deleteSpot, deleteBookings } from '../api';



export const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [allSpots, setAllSpots] = useState([]);

    const bookings = setAllBookings(getBookings());
    const spots = setAllSpots(getSpots());

    setAllBookings(bookings.data);
    setAllSpots(bookings.data);

    let bookingsList = [];
    let spotList = [];


    bookings.array.forEach(element => {
        let book = `<h3>${element.user.login}</h3> <p>${element.spot.number}</p>
        <span>${element.start_time} - ${element.end_time}</span>`
        bookingsList.push(book);
    });

    spots.array.forEach(element => {
        let spot = ``
    })





    return (
        <>
        
        
        
        </>
)};
