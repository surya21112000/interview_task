import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import  LoginPic from './mobile.gif'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Login =()=>{
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [usernameError,setUsernameError]=useState(false)
  const [passwordError,setPasswordError]=useState(false)
  const [userHelpText,setUserHelpText]=useState(false)
  const [passHelpText,setPassHelpText]=useState(false)
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const handleSignIn = async () => {
    if(username.length==0 || password.length==0 || password.length<=8){
    if(username.length==0){
      setUsernameError(true)
      setUserHelpText("* Please Enter Username")
    }
 
    if(password.length==0){
      setPasswordError(true)
      setPassHelpText("* Please Enter password")
    }
   
    if(password.length<=8 && password.length>=1){
      setPassHelpText("* Password must contain 8 characters")
      setPasswordError(true)
    }
  }
  else{
    setPasswordError(false)
    setUsernameError(false)
    setPassHelpText('')
    setUserHelpText('')
    axios.post('http://localhost:5000/login',{username,password}).then(res=>{
      console.log(res.data)
      localStorage.setItem('token',res.data.token)
      navigate('/tasks')
     }).catch(err=>{
      console.log(err)
     })
   }
  
  };
    
    

  return (
    <div>
      <img src={LoginPic} style={{position:"absolute",height:"70%",left:"15%"}}></img>
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" sx={{
        marginTop:"7%",
        marginLeft:"60%",
        padding:"5%"
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              error={usernameError}
              helperText={userHelpText}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              error={passwordError}
              helperText={passHelpText}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
            
              </Grid>
              <Grid item>
                <Link onClick={()=>navigate('/register')} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </div>
  );
}