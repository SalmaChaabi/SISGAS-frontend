import { List, Paper } from "@mui/material";
import UserItem from "./UserItem";
import { User } from "../services/users/getAllUsers";



type UserListProps = {
    data: any
    onDelete: (id: string) => void
}
const UserList = ({ data, onDelete }: UserListProps) => {



    return <Paper sx={{ maxHeight: '100%', overflow: 'auto' }} >
        <List >
            {/* hide delete button if user is admin */}
            {data.map((user: User) => (<UserItem key={user._id} user={user} hideDelete={false} onDelete={onDelete} />))}
        </List>
    </Paper>


}

export default UserList;