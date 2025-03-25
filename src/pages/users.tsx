import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getAllUsers, User } from "../services/users/getAllUsers";
import UserList from "../components/custom/user/UserListDataGrid";
import Signup from "../components/custom/user/UserForm";
import { addUserAdmin, AddUserAdminType } from "../services/users/addUserAdmin";
import { updateUser } from "../services/users/UpdateUser";

const UsersPage = () => {
  // const { data } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: getAllUsers
  // })
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [users, setUsers] = useState<any>([]);
  const addUser = async (user: AddUserAdminType) => {
    const newUser = await addUserAdmin(user);
    if (newUser.success) {
      setUsers((recentUsers: User[]) => [...recentUsers, newUser.data]);
    }
    return newUser;
  };
  const handleUpdateUser = async (userId: string, user: AddUserAdminType) => {
    const newUser = await updateUser(userId, user);

    if (newUser.success) {
      setUsers((recentUsers: any) =>
        recentUsers.map((item: any) =>
          item._id === userId ? newUser.data : item
        )
      );
    }
    return newUser;
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  return (
    <Stack
      spacing={2}
      sx={{
        maxHeight: "100%",
      }}
    >
      <Button
        variant="contained"
        onClick={() => setDialogOpen(true)}
        sx={{ alignSelf: "end" }}
      >
        add new user
      </Button>
      <UserList
        data={users}
        onDelete={(id: string) => {
          setUsers((recentUsers: any) =>
            recentUsers.filter((item: any) => item._id !== id)
          );
        }}
        onUpdate={handleUpdateUser}
      />
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>New User Account</DialogTitle>
        <DialogContent>
          <Signup onSubmit={addUser} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default UsersPage;
