import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  InputAdornment,
  Alert,
} from '@mui/material';
import { authService } from '../services/authService';
import { RegisterRequest } from '@/types';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
    try {
      // await authService.register(data);
      await registerUser(data.username, data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Logo />
        <Typography component="h1" variant="h5" sx={{ mt: 2, color: 'text.secondary' }}>
          Register new account
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            {...register('username')}
            margin="normal"
            fullWidth
            label="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: 'primary.main' }}>^</Box>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('email')}
            margin="normal"
            fullWidth
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box component="span" sx={{ color: 'primary.main' }}>^</Box>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register('password')}
            margin="normal"
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    component="span"
                    sx={{ color: 'primary.main', cursor: 'pointer' }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Box>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: 'white', textTransform: 'none' }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Or
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          Already have an account? <Link component={RouterLink} to="/login" color="primary">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;