import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton, Avatar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import BannerIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios"; // for API calls

const ProfileComponent = () => {
  const [role, setRole] = useState(null); // Manufacturer or Consumer
  const [profileData, setProfileData] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  // Fetch role from the database (mocked as 'manufacturer' for this example)
  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await axios.get("/api/user-role"); // Fetch the user role
        setRole(response.data.role); // manufacturer or consumer
        setProfileData(response.data.profile); // initial profile data
      } catch (error) {
        console.error("Error fetching role", error);
      }
    }
    fetchUserRole();
  }, []);

  // Handle Profile Picture Upload
  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  // Handle Cover Photo Upload
  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(URL.createObjectURL(e.target.files[0]));
  };

  // Framer animation for smooth transitions
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Box sx={{display:'flex', justifyContent:'center'}}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "60%",
          p: 2,
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Cover Photo Section */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "200px",
            backgroundImage: `url(${coverPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        >
          <IconButton
            color="primary"
            sx={{ position: "absolute", bottom: 8, right: 8 }}
            component="label"
          >
            <input type="file" hidden onChange={handleCoverPhotoChange} />
            <BannerIcon />
          </IconButton>
        </Box>

        {/* Profile Picture Section */}
        <Box sx={{ position: "relative", mt: -10 }}>
          <Avatar
            src={profilePic}
            sx={{ width: 120, height: 120, border: "5px solid white" }}
          />
          <IconButton
            color="primary"
            sx={{ position: "absolute", bottom: 0, right: 0 }}
            component="label"
          >
            <input type="file" hidden onChange={handleProfilePicChange} />
            <PhotoCamera />
          </IconButton>
        </Box>

        <Typography variant="h5" sx={{ mt: 2 }}>
          {role === "manufacturer" ? "Manufacturer Profile" : "Consumer Profile"}
        </Typography>

        {/* Profile Form based on Role */}
        <Box
          component="form"
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          {/* Shared Basic Information Fields */}
          {role === "manufacturer" ? (
            <>
              <TextField
                label="Company Name"
                value={profileData.companyName || ""}
                onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Contact Person"
                value={profileData.contactPerson || ""}
                onChange={(e) => setProfileData({ ...profileData, contactPerson: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={profileData.email || ""}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={profileData.phone || ""}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                fullWidth
              />

              {/* Manufacturer-specific fields */}
              <TextField
                label="Industry Type"
                value={profileData.industryType || ""}
                onChange={(e) => setProfileData({ ...profileData, industryType: e.target.value })}
                fullWidth
              />
              <TextField
                label="Business Address"
                value={profileData.businessAddress || ""}
                onChange={(e) => setProfileData({ ...profileData, businessAddress: e.target.value })}
                fullWidth
              />
              <TextField
                label="Registration Number"
                value={profileData.registrationNumber || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, registrationNumber: e.target.value })
                }
                fullWidth
              />

              {/* Document Upload */}
              <Button variant="contained" component="label">
                Upload Business Verification Document
                <input type="file" hidden />
              </Button>
            </>
          ) : (
            <>
              {/* Consumer-specific fields */}
              <TextField
                label="Name"
                value={profileData.name || ""}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={profileData.email || ""}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={profileData.phone || ""}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Address"
                value={profileData.address || ""}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                fullWidth
              />

              {/* Email/Phone Verification */}
              <Button variant="contained" onClick={() => alert("Verification Process Started!")}>
                Verify Email/Phone
              </Button>
            </>
          )}
        </Box>
      </Box>
      </Box>
    </motion.div>
  );
};

export default ProfileComponent;
