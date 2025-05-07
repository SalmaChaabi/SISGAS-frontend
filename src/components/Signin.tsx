import React from 'react'
import { TextField, Typography } from '@mui/material'
import { Button, Paper, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import { login } from '../services/auth/login';
import { useNavigate } from 'react-router';


const Signin = () => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const passwordText = password.length < 8 ? 'password must be at least 8 charachters' : '';
  const emailText = email.includes('@') ? '' : 'email must have @';
  const isFormError = passwordText || emailText;

  const handleSubmit = async () => {
    if (isFormError) {
      console.log('form is wrong');
      setError(true);
    } else {
      setError(false);
      console.log({ email, password });
      const res = await login(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(true);
      }
    }
  };

  return (
    <Paper>
      <Stack spacing={2}>
        <TextField
          label="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={emailText}
          error={!!emailText}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={passwordText}
          error={!!passwordText}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Signin
        </Button>
        {error && <Typography color="error">form is wrong</Typography>}
        <Link href="https://www.google.co.uk/">Google</Link>
      </Stack>
    </Paper>
  );
};


export default Signin
