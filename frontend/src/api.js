const API_URL = "http://127.0.0.1:8000/";
const API_URL_BOOKING = `${API_URL}bookings/`;

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };
};

export const getSpots = async () => {
    const response = await fetch(`${API_URL}spots/`);
    return response.json();
};

export const addSpot = async (spotData) => {
    const response = await fetch(`${API_URL}spots/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(spotData),
    });
    return response.json();
};

export const deleteSpot = async (id) => {
    await fetch(`${API_URL}spots/${id}/`, {
        method: "DELETE",
        headers: getHeaders()
    });
};

// исправлено: регистрация теперь отправляет роль по умолчанию, как ждет бэкенд
export const authRegister = async (authData) => {
    const response = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ ...authData, role: "user" }),
    });
    return response.json();
};

// исправлено: передаем данные в формате Form Data для FastAPI OAuth2
export const authToken = async (authData) => {
    const formData = new URLSearchParams();
    formData.append('username', authData.username); // в FastAPI username это email
    formData.append('password', authData.password);

    const response = await fetch(`${API_URL}auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
    });
    return response.json();
};

export const createBooking = async (bookingData) => {
    const response = await fetch(`${API_URL_BOOKING}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(bookingData),
    });
    return response.json();
};

export const getMyBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}my`, { // убран лишний слеш для соответствия роуту
        headers: getHeaders()
    });
    return response.json();
};

export const getBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}`, {
        headers: getHeaders()
    });
    return response.json();
};

export const deleteBookings = async (id) => {
    await fetch(`${API_URL_BOOKING}${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}users/me`, {
        headers: getHeaders()
    });
    return response.json();
}
