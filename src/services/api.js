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

// reviews

export async function getReviews() {
    return await API.get("/qualification-of-artist/get-qualification-artist/", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getReviewsOfTattooist(id) {
    return await API.get(`/qualification-of-artist/get-qualification-artist/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function deleteReview(id) {
    return await API.delete(`/qualification-of-artist/delete-qualification/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getUserReviews(id) {
    return await API.get(`/qualification-of-artist/get-qualification-for-user/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// Tattoos posts

export async function getTattooPosts() {
    return await API.get("/posts-tattoo-artist-admin/get-posts-artists", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function getTattooistPosts(id) {
    return await API.get(`/posts-tattoo-artist-admin/get-posts-id/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

}

export async function deleteTattooPost(id) {
    return await API.delete(`/posts-tattoo-artist-admin/delete-post/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

// tattooists to verify

export async function getTattooistsToVerify() {
    return await API.get("/users-and-artist/get-artists-inauthorized/", {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}

export async function toggleTattooistApprobation(id) {
    return await API.post(`/users-and-artist/status-artist/${id}`, null, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
}