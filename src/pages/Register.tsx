import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { authService } from '../services/authService';
import { RegisterRequest } from '@/types';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      await authService.register(data);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            {...register('username')}
            margin="normal"
            fullWidth
            label="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register('email')}
            margin="normal"
            fullWidth
            label="Email Address"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;