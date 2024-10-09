import React from 'react'
import HeroSection from './HeroSection';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <HeroSection />
      <Box sx={{
        height: '60vh',
        backgroundColor: 'lightgreen', marginTop: '30px'
      }} paddingTop={10}>
        <Box>
          <Typography
            sx={{ textAlign: 'center' }}
            variant={isMobile ? 'h3' : 'h2'}>
            Why EcoChain?
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent='space-between'
          alignContent="center"
          padding={2}
          alignItems='center'
        >
dzfvbzdfbvz

        </Box>
      </Box>

    </>
  );
}

export default Home