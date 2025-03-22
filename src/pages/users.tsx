import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import { getAllUsers } from '../services/users/getAllUsers'
import UserList from '../components/UsersList'
import Signup from '../components/Signup'

const UsersPage = () => {
  // const { data } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: getAllUsers
  // })
  const [users, setUsers] = useState<any>([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers()
      setUsers(response.data)
    }
    fetchUsers()
  }, [])
  return (
    <Stack direction="row" spacing={2} sx={{
      maxHeight: '100%'
    }}>
      <UserList data={users} onDelete={(id: string) => {
        setUsers(((recentUsers: any) => recentUsers.filter((item: any) => item._id !== id)))
      }} />
      <Signup onSubmit={(user: any) => { setUsers(((recentUsers: any) => [...recentUsers, user])) }} />
    </Stack>
  )
}

export default UsersPage
