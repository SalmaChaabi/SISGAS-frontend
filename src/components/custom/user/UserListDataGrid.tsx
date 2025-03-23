import { Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { deleteUser } from "../../../services/users/deleteUser";

import UserItemActions from "./UserItemActions";

type UserListProps = {
  data: any;
  onDelete: (id: string) => void;
};

//const handleDelete = (id: string) => {
// setUsers(prev => prev.filter(user => user._id !== id));
//};
const UserList = ({ data, onDelete }: UserListProps) => {
  const columns: GridColDef[] = [
    { field: "firstName", headerName: "FirstName", width: 150 },
    { field: "lastName", headerName: "LastName", width: 150 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "user_image",
      headerName: "User image",
      width: 150,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const handleDelete = async () => {
          try {
            await deleteUser(params.id.toString());
            onDelete(params.id.toString());
          } catch (err) {
            console.error("Failed to delete user", err);
          }
        };
        return <UserItemActions onDelete={handleDelete} />;
      },
    },
  ];

  return (
    <DataGrid
      rows={data.map(({ _id, ...item }) => ({ ...item, id: _id }))}
      columns={columns}
    />
  );

  // return <Paper sx={{ maxHeight: '70%', overflow: 'auto' }} >
  //     <List >
  //         {/* hide delete button if user is admin */}
  //         {data.map((user: User) => (<UserItem key={user._id} user={user} hideDelete={false} onDelete={onDelete} />))}
  //     </List>
  // </Paper>
};

export default UserList;
