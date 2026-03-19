import React, { useState } from 'react';
import TableCard from './TableCard';
import { getMyBookings } from '../api';


export const MyAccount = () => {

    const [role, setRole] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);

    setRole(localStorage.getItem('role'))
    if (localStorage.getItem('role')) {
        setIsAuthorized(true)  
    }


    const bookings = getMyBookings();

    let bookingList = [];

    bookings.array.forEach(element => {
        let book = `<li>
        <h3>${element.spot.number}</h3>
         <span>${element.start_time} - ${element.end_time}</span>
         </li>`
         bookingList.push(book);
    });





    return (

        <>

            

            {!isAuthorized ? <p>У вас нет доступа</p> : <ul>
                {bookingList}
            </ul> }

        
        
        </>

    );


};

