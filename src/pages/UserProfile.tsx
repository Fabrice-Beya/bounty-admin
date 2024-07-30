import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, TextField, Switch, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { UserProfile as UserProfileType } from '../types';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userProfile = await authService.getUserProfile();
      setProfile(userProfile);
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev: UserProfileType | null) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  };

  const handleSave = async () => {
    if (profile) {
      try {
        await authService.updateUserProfile(profile);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  if (!profile) {
    return <Typography>Loading user profile...</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      
      {/* <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Email Notification</Typography>
        <TextField
          fullWidth
          label="Notification Email"
          name="notificationEmail"
          value={profile.notificationEmail}
          onChange={handleInputChange}
          disabled={!isEditing}
          margin="normal"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Switch
            checked={profile.enableNotification}
            onChange={handleInputChange}
            name="enableNotification"
            disabled={!isEditing}
          />
          <Typography>Enable Notification</Typography>
        </Box>
      </Box> */}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Information</Typography>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleInputChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          value={profile.fullName}
          onChange={handleInputChange}
          disabled={!isEditing}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleInputChange}
          disabled={!isEditing}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Contact Number"
          name="contactNumber"
          value={profile.contactNumber}
          onChange={handleInputChange}
          disabled={!isEditing}
          margin="normal"
        />
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        {isEditing ? (
          <>
            <Button onClick={() => setIsEditing(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default UserProfile;