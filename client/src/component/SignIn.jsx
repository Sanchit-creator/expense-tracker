import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from '../services/api';

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

const loginInitialValues = {
  email: '',
  password: ''
}

export default function SignIn() {
  const [login, setLogin] = useState(loginInitialValues)
  const [loading, setLoading] = useState(false)

  const onValueChange = (e) => {
    setLogin({...login, [e.target.name]: e.target.value});
  }
  const navigate = useNavigate(); 

  const loginUser = async () => {
    try {
      setLoading(true)
      let response = await signIn(login);
      if (response) {
        console.log(response);
        setLoading(false)
        localStorage.setItem("userInfo", JSON.stringify(response))
        localStorage.setItem("token", JSON.stringify(response.token))
        localStorage.setItem("user", response.user)
        localStorage.setItem("params", response.id)
        if (localStorage.getItem('userInfo')) {
          navigate(`/dashboard/${localStorage.getItem('params')}`)
          toast.success('Welcome!')
        }
      }
      else{
        toast.error('Error while Login')
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

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }


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
            Expense Tracker Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onValueChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loginUser()}
              style={{ backgroundColor: "#00B000" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}