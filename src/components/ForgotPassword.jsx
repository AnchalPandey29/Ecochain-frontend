import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle sending OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/send-otp', { email });
        if (response.data.success) {
        setShowOtpField(true);
        toast.success('OTP sent to your email!');
      } else {
        toast.error(response.data.message || 'Email not registered. Please write a correct email or sign up.');
      }
    } catch (error) {
      toast.error('Error sending OTP. Try again!');
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error('Please enter the OTP.');
      return;
    }

    try {
      const response = await axios.post('/api/verify-otp', { email, otp });
      if (response.data.success) {
        setShowResetForm(true);
        toast.success('OTP verified! Reset your password.');
      } else {
        toast.error('Invalid OTP, please try again.');
      }
    } catch (error) {
      toast.error('Error verifying OTP.');
    }
  };

  // Handle resetting password
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error('Please enter your new password and confirm it.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', { email, password });
      if (response.data.success) {
        toast.success('Password reset successful!');
      } else {
        toast.error('Error resetting password.');
      }
    } catch (error) {
      toast.error('Error resetting password.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      sx={{ backgroundColor: '#f5f5f5', padding: '40px' }}
    >
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>
        {!showOtpField && !showResetForm && (
          <>
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSendOtp}
              sx={{ marginTop: '16px', padding: '10px' }}
            >
              Send OTP
            </Button>
          </>
        )}

        {showOtpField && !showResetForm && (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              variant="outlined"
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleVerifyOtp}
              sx={{ marginTop: '16px', padding: '10px' }}
            >
              Verify OTP
            </Button>
          </>
        )}

        {showResetForm && (
          <>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              variant="outlined"
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleResetPassword}
              sx={{ marginTop: '16px', padding: '10px' }}
            >
              Reset Password
            </Button>
          </>
        )}
      </motion.div>
    </Box>
  );
};

export default ForgotPassword;
