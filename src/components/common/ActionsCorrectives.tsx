import { Modal, Box, Typography, List, ListItem, ListItemText } from "@mui/material";

type ActionCorrectivesModalProps = {
  open: boolean;
  onClose: () => void;
  actions: any[]; // typiquement, liste d'actions correctives
};

const ActionCorrectivesModal = ({ open, onClose, actions }: ActionCorrectivesModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Actions Correctives
        </Typography>

        {actions.length === 0 ? (
          <Typography color="text.secondary">Pas d'actions correctives.</Typography>
        ) : (
          <List>
            {actions.map((action, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={action.titre || `Action ${index + 1}`} 
                  secondary={action.description || ''} 
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};

export default ActionCorrectivesModal;
