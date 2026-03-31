const API_URL = "http://127.0.0.1:8000"; // Убрала слэш в конце
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

//  Столы
export const getSpots = async () => {
    const response = await fetch(`${API_URL}/spots`);
    return response.json();
};


export const addSpot = async (spotData) => {
    const response = await fetch(`${API_URL}/spots`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(spotData),
    });
    return response.json();
};

export const deleteSpot = async (id) => {
    await fetch(`${API_URL}/spots/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
};

//  Регистрация
export const authRegister = async (authData) => {
    const response = await fetch(`${API_URL}/auth/register`, { //  один четкий /
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
    });
    return response.json();
};

//   Авторизация
export const authToken = async (authData) => {
    const formData = new URLSearchParams();
    formData.append('username', authData.username);
    formData.append('password', authData.password);

    const response = await fetch(`${API_URL}/auth/token`, { //  один  /
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
    });
    return response.json();
};



//  Бронирования
export const getMyBookings = async () => {
    const response = await fetch(`${API_URL}/bookings/my`, { //  /bookings/my
        headers: getHeaders()
    });
    return response.json();
};

export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL}/bookings/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(bookingData),
    });
    return response.json();
};

export const getBookings = async () => {
    const response = await fetch(`${API_URL}/bookings/`, {
        headers: getHeaders()
    });
    return response.json();
};

export const deleteBookings = async (id) => {
    await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: getHeaders()
    });
    return response.json();
};