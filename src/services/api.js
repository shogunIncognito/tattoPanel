import axios from "axios";

const API = axios.create({
    baseURL: "https://tattoo-inc-62j4s.ondigitalocean.app/api",
})

const getToken = () => localStorage.getItem("token");

// auth

export async function fetchAdmin() {
    return await API.get("/auth-admin/get-admin", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function loginAdmin(data) {
    return await API.post("/auth-admin/login-admin", data);
}

// tattooists


export async function getTattooists() {
    return await API.get("/users-and-artist/get-artists/", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getUsers() {
    return await API.get("/users-and-artist/get-users/", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function toggleTattooistAccount(id) {
    return await API.post(`/users-and-artist/status-artist/${id}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function toggleUserAccount(id) {
    return await API.post(`/users-and-artist/status-user/${id}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// admins

export async function createAdmin(data) {
    return await API.post("/auth-admin/create-admin/", data, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}