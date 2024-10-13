import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Typography, Grid, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';

const wasteCategories = [
  'Plastic', 'Organic', 'Electronic', 'Metal', 'Paper', 'Glass'
];

const WasteReportForm = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().substring(0, 16));
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  return (
    <Box padding={4}>
        <Box sx={{textAlign:'center',marginBottom:'20px'}}>

      <Typography variant="h4" gutterBottom>Report Waste</Typography>
      <Typography variant="subtitle1" gutterBottom>Please fill out the details below to report waste.</Typography>
        </Box>
      <Grid container spacing={2}>
        
        {/* Location Section */}
        <Grid item xs={12}>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
          />
        </Grid>
        {/* Waste Information Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date and Time"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Category"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            {wasteCategories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>
        
        {/* Quantity Section */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Unit"
            select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            fullWidth
          >
            <MenuItem value="kg">kg</MenuItem>
            <MenuItem value="liters">liters</MenuItem>
          </TextField>
        </Grid>


        {/* Upload Section */}
        <Grid item xs={12}>
          <Typography variant="h6">Upload Photos and Documents</Typography>
          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{ marginBottom: 2 }}
            >
              Upload Photos
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Button>
            <Button
              variant="contained"
              component="label"
              startIcon={<InsertDriveFile />}
            >
              Upload Documents
              <input
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </Button>
          </Box>
          <Box display="flex" flexDirection="column" marginTop={2}>
            {images.map((image, index) => (
              <Typography key={index} variant="body2">
                {image.name}
              </Typography>
            ))}
            {files.map((file, index) => (
              <Typography key={index} variant="body2">
                {file.name}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Additional Information Section */}
        <Grid item xs={12}>
          <TextField
            label="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>

        {/* Action Section */}
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={() => alert('Waste reported')}>
            Submit
          </Button>
          <Button variant="outlined" onClick={() => alert('Draft saved')}>
            Save Draft
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WasteReportForm;
