import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  Stack,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Setting = () => {
    const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleToggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/isAuthenticated",
          { withCredentials: true }
        );

        setUser(res.data.user);
        setFormData({
          username: res.data.user.username || "",
          email: res.data.user.email || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [isEditing]);

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/user/edituser/${user.id}`,
        formData,
        { withCredentials: true }
      );

      alert(res.data.message);
      setUser(res.data.updatedData);
      setIsEditing(false);
      
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure? This will delete your account permanently."
    );
    if (!confirm) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/user/deleteuser/${user.id}`,
        { withCredentials: true }
      );

      alert(res.data.message);
      navigate("/")
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5, px: 2 }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <i className="fas fa-user-gear"></i>
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Account Settings
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Profile Info */}
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              USERNAME
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            ) : (
              <Typography>{user.username}</Typography>
            )}
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              EMAIL ADDRESS
            </Typography>
            {isEditing ? (
              <TextField
                fullWidth
                size="small"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            ) : (
              <Typography>{user.email}</Typography>
            )}
          </Box>
        </Stack>

        {/* Buttons */}
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleToggleEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              fullWidth
              onClick={handleToggleEdit}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Danger Zone */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error" gutterBottom>
            Primal Actions
          </Typography>
          <Button
            color="error"
            size="small"
            onClick={handleDelete}
          >
            Delete Account Permanently
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Setting;
