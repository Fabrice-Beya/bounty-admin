import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Paper, Grid
} from '@mui/material';
import { CreateBountyRequest, BountyPriority } from '../types';
import { bountyService } from '../services/bountyService';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  reward: yup.number().positive('Reward must be positive').required('Reward is required'),
  category: yup.string().required('Category is required'),
  priority: yup.string().oneOf(Object.values(BountyPriority)).required('Priority is required'),
  expiresAt: yup.date().min(new Date(), 'Expiry date must be in the future').nullable(),
}).required();

const CreateBounty: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<CreateBountyRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      priority: BountyPriority.Medium,
    },
  });

  const onSubmit = async (data: CreateBountyRequest) => {
    try {
      await bountyService.createBounty(data);
      navigate('/bounties');
    } catch (error) {
      console.error('Failed to create bounty:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCancel = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Create Bounty</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="reward"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Reward"
                    type="number"
                    fullWidth
                    error={!!errors.reward}
                    helperText={errors.reward?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority</InputLabel>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Priority">
                      {Object.values(BountyPriority).map((priority) => (
                        <MenuItem key={priority} value={priority}>
                          {priority}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="expiresAt"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Expires At"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.expiresAt}
                    helperText={errors.expiresAt?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Bounty
              </Button>
            </Box>
          </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateBounty;