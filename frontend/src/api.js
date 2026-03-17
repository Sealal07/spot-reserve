
const API_URL = "http://127.0.0.1:8000/";
const API_URL_BOOKING = `${API_URL}bookings/`;



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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spotData),
    });
    return response.json();
};

// /spots/{id} DELETE
export const delelteSpot = async (id) => {
    await fetch(`${API_URL}spots/${id}/`, {method:"DELETE"});
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
    });
    return response.json();
};

// /bookings/my GET
export const getMyBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}my/`);
    return response.json();
};

// /bookings GET
export const getBookings = async () => {
    const response = await fetch(`${API_URL_BOOKING}`);
    return response.json();
};

// /bookings/{id} DELETE
export const deleteBookings = async (id) => {
    const response = await fetch(`${API_URL_BOOKING}${id}/`,{
        method: "DELETE"
    });
};

// USERS

// /users/me GET
export const  getUsers = async () => {
    const response = await fetch(`${API_URL}users/me/`)
    return response.json();
}




