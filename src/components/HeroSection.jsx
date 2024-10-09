import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const images1 = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
];

const images2 = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyeVfLMzcEE3y_8M5K-QKDT-6H7uLqrMtOyA&s',
];

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Duplicate images to create the infinite loop effect
  const loopImages1 = [...images1, ...images1, ...images2];
  const loopImages2 = [...images2, ...images2, ...images1];
  
  const totalDuration = 25; // Adjusted for smoothness

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={isMobile ? 'column' : 'row'}
      padding={4}
      sx={{ height: '100vh',backgroundColor:'#99ff99' }}
    >
      {/* Left Text Section */}
      <Box>
        <Typography variant={isMobile ? 'h3' : 'h2'} component="h1">
          EcoChain
        </Typography>
        <Typography variant={isMobile ? 'h6' : 'h5'} component="h2">
          Your Tagline Here
        </Typography>
      </Box>

      {/* Right Image Section */}
      <Box
        display="flex"
        overflow="hidden"
        sx={{ width: isMobile ? '100%' : '50%', height: '100vh' }}
      >
        {/* First set of images scrolling upwards */}
        <motion.div
          animate={{ y: ['100%', '-100%'] }}
          transition={{ repeat: Infinity, duration: totalDuration, ease: 'linear' }}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', paddingRight:'5px' }}
        >
          {loopImages1.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', paddingTop:'12px' }}
            />
          ))}
        </motion.div>

        {/* Second set of images scrolling downwards */}
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: totalDuration, ease: 'linear' }}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', paddingLeft: '5px' }}
        >
          {loopImages2.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', paddingTop:'12px' }}
            />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
