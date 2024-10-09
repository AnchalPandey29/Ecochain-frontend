import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate=useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for handling form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication logic (replace with your API call)
    if (email === 'test@example.com' && password === 'password123') {
      alert('Logged in successfully!');
      setError('');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: isMobile ? '20px' : '40px',
      }}
    >
      {/* Framer Motion Animation for the form container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: isMobile ? '20px' : '40px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '16px', padding: '10px' }}
          >
            Login
          </Button>

          {/* Forgot password and Signup options */}
          <Box mt={2} display="flex" justifyContent="space-between" sx={{cursor:"pointer"}}>
            <Typography onClick={()=>{
                navigate('/forgotpassword')
            }}  
                variant="body2">
              Forgot Password?
            </Typography>
            <Typography onClick={()=>{
                navigate('/signup')
            }} variant="body2">
              Don't have an account? Sign Up
            </Typography>
          </Box>
        </form>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
