import { User } from "./getAllUsers";

export type GetUserByIDType = {
    success: boolean
    data: User
}
export const getUserByID = async (userId:string) => {
    const response = await fetch(`http://localhost:5001/auth/getUserbyID/${userId}` ,);

    const data = await response.json()
    return { success: response.status === 200, data } as GetUserByIDType
}