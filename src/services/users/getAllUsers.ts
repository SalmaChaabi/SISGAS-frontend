
export type User = {
    "_id": "67db476d1e967c76ec7125ce",
    "firstName": "John",
    "lastName": "Smith",
    "email": "johnsmith960@gmail.com",
    "password": "$2b$10$tnhC3eNhKXYG0SD6BQzuhu7PVnVg.2rexoK//k9P3yqmltZzX6E1O",
    role: "admin" | "technicien radio",
    "user_image": "utilisateur.png",
    "createdAt": "2025-03-19T22:38:37.410Z",
    "updatedAt": "2025-03-19T22:38:37.410Z",
    "__v": 0
}
export type GetAllUsersType = {
    success: boolean
    data: User[]
}
export const getAllUsers = async () => {
    const response = await fetch('http://localhost:5001/auth/getAllUsers');

    const data = await response.json()
    return { success: response.status === 200, data: data.usersListe } as GetAllUsersType
}