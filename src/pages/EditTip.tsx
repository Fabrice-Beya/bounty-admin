import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Paper, Grid, CircularProgress
} from '@mui/material';
import { UpdateTipRequest, TipCategory, TipStatus } from '../types';
import { tipService } from '../services/tipService';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().oneOf(Object.values(TipCategory)).required('Category is required'),
  datetime: yup.date().required('Date/Time is required'),
  location: yup.string().required('Location is required'),
  status: yup.string().oneOf(Object.values(TipStatus)).required('Status is required'),
}).required();

const EditTip: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateTipRequest>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTip = async () => {
      if (!id) return;
      try {
        const tip = await tipService.getTipById(id);
        if (tip) {
          reset({
            ...tip,
            datetime: new Date(tip.datetime),
          });
        }
      } catch (error) {
        console.error('Failed to fetch tip:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTip();
  }, [id, reset]);

  const onSubmit = async (data: UpdateTipRequest) => {
    if (!id) return;
    try {
      await tipService.updateTip({ ...data, id });
      navigate('/tips');
    } catch (error) {
      console.error('Failed to update tip:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Tip</Typography>
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
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Category">
                      {Object.values(TipCategory).map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="datetime"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date/Time"
                    type="datetime-local"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.datetime}
                    helperText={errors.datetime?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Location"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Status">
                      {Object.values(TipStatus).map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => navigate(-1)} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Tip
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTip;