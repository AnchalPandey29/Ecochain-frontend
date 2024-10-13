import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const cards = [
    {
      header: 'Total Waste Collectors',
      count: 100,
      icon: <GroupIcon fontSize="large" />,
      color: '#f44336'
    },
    {
      header: 'Total Waste Reported Today',
      count: 200,
      icon: <ReportIcon fontSize="large" />,
      color: '#2196f3'
    },
    {
      header: 'Total Waste Collected Today',
      count: 150,
      icon: <DeleteIcon fontSize="large" />,
      color: '#4caf50'
    }
  ];

  return (
    <Box padding={4}>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ backgroundColor: card.color }}>
                <CardContent sx={{ display: 'flex' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{card.header}</Typography>
                    <Typography variant="h4">{card.count}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%' }}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {card.icon}
                    </motion.div>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Data Overview
            </Typography>
            <Chart type="bar" data={data} options={options} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
