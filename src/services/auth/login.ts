export const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    const data = await response.json()


    return { success: response.status === 200, message: data.message, user: data }
}