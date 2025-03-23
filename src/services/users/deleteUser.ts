export const deleteUser = async (userId: string) => {
    const response = await fetch(`http://localhost:5001/auth/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  
    const data = await response.json();
  
    return {
      success: response.status === 200,
      message: data.message,
      data: data.data,
    };
  };