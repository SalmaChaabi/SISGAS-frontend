export const updateUser = async (userId:string,userData:any ) => {

    const response = await fetch(`http://localhost:5001/auth/updateUser/${userId}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(userData)
    })
    const data = await response.json()


    return { success: response.status === 200, message: data.message, data: data.data }
}
//const Somme = (x:number,y:number) => {
   // return x + y
//}
//Somme(5,2)