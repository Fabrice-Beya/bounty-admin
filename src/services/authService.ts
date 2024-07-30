import { getToken } from '../contexts/AuthContext';
import { RegisterRequest, LoginRequest, AuthResponse, UserModel, UserProfile } from '@/types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  console.log("Token", token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  getUserProfile: async (): Promise<UserProfile> => {
    const response = await axiosInstance.get(`${API_URL}/user/profile`);
    return response.data;
  },

  updateUserProfile: async (profile: Partial<UserProfile>): Promise<void> => {
    await axiosInstance.put(`${API_URL}/user/profile`, profile);
  },

  getMe: async (): Promise<UserModel> => {
    const response = await axiosInstance.get(`${API_URL}/auth/me`);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(`${API_URL}/auth/logout`);
  },
};