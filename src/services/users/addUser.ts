import { User } from "./getAllUsers";

export type AddUserParam = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role:string;
};
export type AddUserResponse = {
  success: boolean;
  message: string;
  data: User;
};
export const addUser = async (userData:AddUserParam ) => {
  const response = await fetch("http://localhost:5001/auth/addUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  return {
    success: response.status === 201,
    message: data.message,
    data: data.user,
  } as AddUserResponse;
}