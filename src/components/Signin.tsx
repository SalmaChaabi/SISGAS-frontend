import React from 'react'
import { TextField, Typography } from '@mui/material'
import { Button, Paper, Link } from '@mui/material';
import Stack from '@mui/material/Stack';
import { login } from '../services/auth/login';
import { useNavigate } from 'react-router';


  const signIn = async (provider) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`);
        resolve({ error: 'This is a mock error message.' });
      }, 500);
    });
    return promise;
  };
  

const Signin = (className = Signin) => {
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(false)
    let navigate = useNavigate()
    //tertiary statement (condition ? true result : false result )
    const passwordText = (password.length < 8) ? 'password must be at least 8 charachters' : ''
    const emailText = (email.includes('@')) ? '' : 'email must have @'

    const isFormError = passwordText || emailText
    const handleSubmit = async () => {//check if form is wrong and send data to backend if form is correct
        if (isFormError) {
            console.log('form is wrong')
            setError(true)

        } else {
            setError(false)
            console.log({ email, password })//change this to send data to backend
            const res = await login(email,password)
            if(res.success){
              navigate('/')
            }else{
              setError(true)
            }
        }

    }

    return (
        <Paper>
            <Stack spacing={2}>
                <TextField
                    label="email"
                    type="text"
                    // controlled input because value is set by state (if state is empty the input will always be empty)
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}//onChange works for everytime we type something
                    helperText={emailText}//always show error message
                    error={emailText}//if we have a text then we have an error
                />

                <TextField label="Password" type="Password" value={password} onChange={(e) => setPassword(e.target.value)} helperText={passwordText} error={passwordText} />
                <Button variant="contained" type="submit" onClick={handleSubmit}>Signin</Button>
                {error && <Typography color='error'>form is wrong</Typography>} {/*conditional rendering (if true then show error message)*/}
                <Link href="https://www.google.co.uk/">Google</Link>
            </Stack>
        </Paper>
    )
}

export default Signin
