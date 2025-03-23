import React from 'react';
import { TextField, Typography, Button, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import { addUserAdmin } from '../../../services/users/addUserAdmin';

type  UserFormProps = {
    onSubmit: (user: any) => void
}
const UserForm = ({ onSubmit }: UserFormProps) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [adresse, setAdresse] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const [userData, setUserdata] = React.useState(false);

    const [response, setResponse] = React.useState(null);
    // Vérification des entrées
    const firstNameError = firstName.length < 2 ? 'Le prénom doit avoir au moins 2 caractères' : '';
    const lastNameError = lastName.length < 2 ? 'Le nom doit avoir au moins 2 caractères' : '';
    const adresseError = adresse.length < 6 ? 'Adresse invalide' : '';
    const emailError = email.includes('@') ? '' : 'Email invalide (doit contenir @)';
    const passwordError = password.length < 8 ? 'Le mot de passe doit avoir au moins 8 caractères' : '';

    const isFormError = firstNameError || lastNameError || adresseError || emailError || passwordError;

    const handleSubmit = async () => {
        if (isFormError) {
            console.log('Formulaire invalide');
            setError(true);
        } else {
            try {
                setError(false);
                const res = await addUserAdmin({ firstName, lastName, email, password })
                setResponse(res)
                if (res.data) {
                    onSubmit(res.data)
                }

            } catch (error) {
                console.error('Erreur lors de l’ajout de l’utilisateur', error);
                setError(true);
            }
            // Ici, envoyer les données au backend
        }

    };

    return (
            <Stack spacing={2}>
                <TextField
                    label="FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    helperText={firstNameError}
                    error={!!firstNameError}
                />
                <TextField
                    label="LastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    helperText={lastNameError}
                    error={!!lastNameError}
                />
                <TextField
                    label="Adress"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    helperText={adresseError}
                    error={!!adresseError}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    helperText={emailError}
                    error={!!emailError}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText={passwordError}
                    error={!!passwordError}
                />
                <Button variant="contained" type="submit" onClick={handleSubmit}>
                    ADDUSER
                </Button>
                {response && <Typography color={response.success ? 'success' : "error"}>{response.message}</Typography>}
            </Stack>
        
    );
};

export default UserForm;