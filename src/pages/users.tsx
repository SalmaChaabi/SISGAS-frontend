import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import { getAllUsers } from '../services/users/getAllUsers'
import UserList from '../components/custom/user/UserListDataGrid'
import Signup from '../components/custom/user/UserForm'
import { addUserAdmin } from '../services/users/addUserAdmin'

const UsersPage = () => {
  // const { data } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: getAllUsers
  // })
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const [users, setUsers] = useState<any>([])
  const addUser=async({firstName,lastName,email,password})=>{
    const res = await addUserAdmin({
              firstName,
              lastName,
              email,
              password,
            });
            setUsers(((recentUsers: any) => [...recentUsers, res])) ;
            return res 
  }
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers()
      setUsers(response.data)
    }
    fetchUsers()
  }, [])
  return (
    <Stack spacing={2} sx={{
      maxHeight: '100%'
    }}>
      <Button variant='contained' onClick={() => setDialogOpen(true)} sx={{ alignSelf: 'end' }}>add new user</Button>
      <UserList data={users} onDelete={(id: string) => {
        setUsers(((recentUsers: any) => recentUsers.filter((item: any) => item._id !== id)))
      }} />
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>New User Account</DialogTitle>
        <DialogContent>
          <Signup onSubmit={addUser}/>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default UsersPage
