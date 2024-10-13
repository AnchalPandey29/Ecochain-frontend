// UserProfile.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  IconButton,
  Avatar,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import { updateUserProfile } from "../services/apiCalls";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../services/apicalls";

const UserProfile = () => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [coverPhotoURL, setCoverPhotoURL] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    aadhar: "",
    occupation: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = localStorage.getItem("userData");
        const userObj = JSON.parse(response);
        const user = {
          name: userObj.name || "",
          username: userObj.username || "",
          email: userObj.email || "",
          phone: userObj.mobile || "",
          aadhar: userObj.aadhar || "",
          occupation: userObj.occupation || "",
          address: userObj.address || "",
        };
        setProfilePhotoURL(userObj.profilePhoto || "");
        setCoverPhotoURL(userObj.coverPhoto || "");
        setUserData((prev) => ({ ...prev, ...user }));
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append JSON fields
      formData.append("email", userData.email);
      formData.append("aadhar", userData.aadhar);
      formData.append("occupation", userData.occupation);
      formData.append("address", userData.address);

      // Append image files if available
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      if (coverPhoto) formData.append("coverPhoto", coverPhoto);

      const response = await updateUserProfile(formData);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Error occurred, try again.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("An error occurred while saving.");
    }
  };

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPhoto(file);
      setCoverPhotoURL(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePhotoURL(URL.createObjectURL(file)); // Preview the image
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: "80%", maxWidth: "800px" }}>
        <CardContent>
          {/* Top Section */}
          <Box
            sx={{
              position: "relative",
              height: "200px",
              backgroundColor: "#147ae4",
              borderRadius: "8px 8px 0 0",
              overflow: "hidden",
            }}
          >
            {coverPhotoURL && (
              <img
                src={coverPhotoURL}
                alt="Cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}

            <input
              accept="image/*"
              style={{ display: "none" }}
              id="cover-photo-upload"
              type="file"
              onChange={handleCoverPhotoChange}
            />
            <label htmlFor="cover-photo-upload">
              <IconButton
                component="span"
                sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Avatar
                src={profilePhotoURL}
                sx={{ width: 100, height: 100, border: "3px solid #fff" }}
              >
                {!profilePhotoURL && <EditIcon />}
              </Avatar>

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-photo-upload"
                type="file"
                onChange={handleProfilePhotoChange}
              />
              <label htmlFor="profile-photo-upload">
                <IconButton
                  component="span"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#fff",
                  }}
                >
                  <EditIcon />
                </IconButton>
              </label>
            </Box>
          </Box>

          {/* Bottom Section */}
          <Box sx={{ marginTop: "60px" }}>
            <form noValidate autoComplete="off" onSubmit={handleSave}>
              <Grid container spacing={2}>
                {["name", "username", "email", "phone"].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={userData[field]}
                      InputProps={{ readOnly: true }}
                      variant="outlined"
                    />
                  </Grid>
                ))}
                {["aadhar", "occupation", "address"].map((field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={userData[field]}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;