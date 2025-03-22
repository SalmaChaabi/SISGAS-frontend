import React from 'react';
// rafce abbreviation to create a component
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

// todo: add props typescript
// props that helps component be flexible
const UserItem = ({ user, hideDelete, onDelete }) => {
    return (
        <ListItem
            // conditional rendering of delete button
            secondaryAction={hideDelete ? null :
                <IconButton edge="end" aria-label="delete" onClick={() => {
                    //todo: implement delete service (link with backend)
                    onDelete(user._id);
                }}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                // template literal => alt + 7
                primary={`${user.firstName} ${user.lastName}`}
                secondary={user.email}
            />
        </ListItem>
    )
}

export default UserItem
