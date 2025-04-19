import { Avatar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { addUser, AddUserParam} from "../../../services/users/addUser";
import { deleteUser } from "../../../services/users/deleteUser";
import UserItemActions from "./UserItemActions";

type UserListProps = {
  data: any;
  onDelete: (id: string) => void;
  onUpdate: (
    userId: string,
    user: AddUserParam
  ) => Promise<{
    success: boolean;
    message: string;
    data: any;
  }>;
};

const UserList = ({ data, onDelete, onUpdate }: UserListProps) => {
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
        return (
          <UserItemActions
            onDelete={handleDelete}
            onUpdate={onUpdate}
            userId={params.id.toString()}
          />
        );
      },
    },
  ];

  return <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />;

  // return <Paper sx={{ maxHeight: '70%', overflow: 'auto' }} >
  //     <List >
  //         {/* hide delete button if user is admin */}
  //         {data.map((user: User) => (<UserItem key={user._id} user={user} hideDelete={false} onDelete={onDelete} />))}
  //     </List>
  // </Paper>
};

export default UserList;
