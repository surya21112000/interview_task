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
import { Snackbar,Alert } from '@mui/material';
import { LockOutlined } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import  SignUpPic from './signup.gif'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

export const Register =()=>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError,setUsernameError]=useState(false)
    const [passwordError,setPasswordError]=useState(false)
    const [userHelpText,setUserHelpText]=useState(false)
    const [passHelpText,setPassHelpText]=useState(false)
    
    const [flag,setFlag]=useState(false)
    const horizontal="bottom"
    const vertical ="right"
    const navigate =useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


const handleSignin = async () => {
    
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
        axios.post('http://localhost:5000/register',{username,password}).then(res=>{
          console.log(res.data)
          setFlag(true)
         }).catch(err=>{
            console.log(err.response.status)
          if(err.response.status==409){
            setUsernameError(true)
            setUserHelpText("* username already exists")
          }
         })
       }
      
    };
    
    

  return (
    <div>
      <img src={SignUpPic} style={{position:"absolute",height:"70%",right:"15%"}}></img>
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" sx={{
        marginTop:"7%",
        marginLeft:"15%",
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
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="user name "
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
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={()=>navigate('/login')} variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    <Snackbar open={flag} autoHideDuration={6000} onClose={handleClose}
    

>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%',background:"lightgreen" }}>
          User Registered Successfully!
        </Alert>
      </Snackbar>

    </div>
  );
}