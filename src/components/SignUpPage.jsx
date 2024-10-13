import React, { useState } from 'react';
import { Box, TextField, Button, Typography, useMediaQuery, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { createUsers } from '../services/apicalls';
import { useAuth } from '../AuthContext';

const SignUpPage = () => {
  const {login}=useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('consumer'); // State for user role

  // Validation and submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate full name
    if (fullName.length < 3 || !/^[a-zA-Z\s]+$/.test(fullName)) {
      toast.error('Full Name should be at least 3 characters long and only contain letters.');
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Validate phone number
    if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
      toast.error('Phone number should be exactly 10 digits.');
      return;
    }

    // Validate password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      toast.error('Password must be at least 6 characters long, and include an uppercase letter, lowercase letter, and a digit.');
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Proceed with signup logic (API call)
    const userData = { name: fullName, email, mobile: phoneNumber, password, role };

    try {
      const response = await createUsers(userData);
      console.log(response);
      if (response.status === 200) {
        const { user, token } = response.data; // Adjust based on your response structure
        login(user, token); // Automatically log in after signup
        toast.success("Registered successfully, Redirecting to Log In");
        setTimeout(() => {
          navigate("/"); // Redirect to the main page or dashboard
        }, 6000);

      } else {
        // Handle error case based on response.error.error or fallback error message
        toast.error(response.error);
      }
    } catch (error) {
      toast.error('An error occurred during signup. Please try again.');
      console.error('Signup error:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="90vh"
      sx={{
        backgroundColor: theme.palette.background.default,
        padding: isMobile ? '20px' : '40px',
      }}
    >
      <ToastContainer />
      {/* Framer Motion animation for the form container */}
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
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
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
          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
          />

          {/* Role Selection Radio Buttons */}
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            Select your role:
          </Typography>
          <RadioGroup
            row
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <FormControlLabel value="collector" control={<Radio />} label="Collector" />
            <FormControlLabel value="user" control={<Radio />} label="User" />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: '16px', padding: '10px' }}
          >
            Submit
          </Button>

          {/* Link to Login Page */}
          <Box mt={2} textAlign="center">
            <Typography
              onClick={() => {
                navigate('/login');
              }}
              variant="body2"
              sx={{ cursor: 'pointer' }}
            >
              Already registered? Click here to Login
            </Typography>
          </Box>
        </form>
      </motion.div>
    </Box>
  );
};

export default SignUpPage;
