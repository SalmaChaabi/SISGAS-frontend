export async function deleteConversation(userId: string) {
  const res = await fetch(`http://localhost:5001/chat/deleteConversation/${userId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }

  return res.json();
}
