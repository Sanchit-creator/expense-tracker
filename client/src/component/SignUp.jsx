import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpUser } from '../services/api';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();

const signupInitialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
}

export default function SignUp() {
    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
        console.log(signup);
    }

  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      let res = await signUpUser(signup);
      if (res) {
        navigate('/')
        toast.success('Successfully Signed Up!')
      }else{
        toast.error('User Already Exist')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  return (
    // <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs" style={{ backgroundColor: "#F0FFF0" }}>
      {/* <CssBaseline /> */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Expense Tracker Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                onChange={(e) => onInputChange(e)}
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => signupUser()}
            style={{ backgroundColor: "#00B000" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
//   </ThemeProvider>
  );
}