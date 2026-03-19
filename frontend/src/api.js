
const API_URL = "http://127.0.0.1:8000/";
const API_URL_BOOKING = `${API_URL}bookings/`;


//функция для добавления токена авторизации
const getHeaders = () => {
    const token = localStorage.getItem("token"); // Берем токен из памяти браузера
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

// SPOTS
// /spots GET
export const getSpots = async () => {
    const response = await fetch(`${API_URL}spots/`);
    return response.json();
};

// /spots POST
export const addSpot = async (spotData) => {
    const response = await fetch(`${API_URL}spots/`, {
        method: "POST",
        headers: getHeaders(), // Добавила авторизацию
        body: JSON.stringify(spotData),
    });
    return response.json();
};

// /spots/{id} DELETE
export const deleteSpot = async (id) => { // Исправила опечатку
    await fetch(`${API_URL}spots/${id}/`, {
        method: "DELETE",
        headers: getHeaders() // Добавила авторизацию
    });
};


// AUTH
// /auth/register POST
export const authRegister = async (authData) => {
    const response = await fetch(`${API_URL}auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(authData),
    });
    return response.json();
};

// /auth/token POST
export const authToken = async (authData) => {
    const response = await fetch(`${API_URL}auth/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
    });
    return response.json();
};

// BOOKING

// /bookings POST
export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL_BOOKING}`, {
        method: "POST",
        headers: getHeaders(), // Добавила авторизацию
        body: JSON.stringify(bookingData), // Исправила authData на bookingData
    });
    return response.json();
};

// /bookings/my GET
export const getMyBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}my/`, {
        headers: getHeaders() // Добавила авторизацию
    });
    return response.json();
};

// /bookings GET
export const getBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}`, {
        headers: getHeaders() // Добавила авторизацию
    });return response.json();
};

// /bookings/{id} DELETE
export const deleteBookings = async (id) => {
    await fetch(`${API_URL_BOOKING}${id}/`, {
        method: "DELETE",
        headers: getHeaders() // Добавила авторизацию
    });
};

// USERS

// /users/me GET
export const  getUsers = async () => {
    const response = await fetch(`${API_URL}users/me/`, {
        headers: getHeaders() // Добавила авторизацию
    });
    return response.json();
}




