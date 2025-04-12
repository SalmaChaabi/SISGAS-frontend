export type UserRole ={

  _id
:string
  name:string
  description:string
}
export type getAllRolestypes = {
  success: boolean
  data: UserRole[]
}

export const getAllRoles = async () => {
  const response = await fetch(`http://localhost:5001/role/getAllRoles`)

  const data = await response.json()
  return {
    success: response.status === 200,
    data: data || []
  } as getAllRolestypes
}

