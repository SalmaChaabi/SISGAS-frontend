import { User } from "./getAllUsers";

export type AddUserAdminType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type AddUserAdminTypeResponse = {
  success: boolean;
  message: string;
  data: User;
};
export const addUserAdmin = async (userData: AddUserAdminType) => {
  const response = await fetch("http://localhost:5001/auth/addUserAdmin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  return {
    success: response.status === 200,
    message: data.message,
    data: data.data,
  } as AddUserAdminTypeResponse;
  //   return {
  //     success: true,
  //     message: "User added successfully",
  //     data: { ...userData, _id: new Date().getTime().toString() },
  //   } as AddUserAdminTypeResponse;
};
