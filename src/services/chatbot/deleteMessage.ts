export async function deleteMessage(id: string) {
  const res = await fetch(`http://localhost:5001/chat/deleteMessage/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }

  return res.json();
}
