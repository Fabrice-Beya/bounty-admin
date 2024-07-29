import { RegisterRequest, LoginRequest, AuthResponse, UserModel, UserProfile } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await delay(1000); // Simulate API delay
    if (data.email === 'existing@example.com') {
      throw new Error('User already exists');
    }
    return {
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
      user: {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        role: 'user',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
          username: data.username,
          fullName: 'New User',
          notificationEmail: data.email,
          enableNotification: true,
          bio: '',
          contactNumber: '',
        },
      },
    };
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await delay(1000); // Simulate API delay
    if (data.email !== 'user@example.com' || data.password !== 'password') {
      throw new Error('Invalid credentials');
    }
    return {
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
      user: {
        id: '123456789',
        email: data.email,
        role: 'admin',
        createdAt: '2023-01-01T00:00:00Z',
        lastLogin: new Date().toISOString(),
        profile: {
          username: 'johndoe',
          fullName: 'John Doe',
          notificationEmail: data.email,
          enableNotification: true,
          bio: '',
          contactNumber: '+1 (936) 514-1641',
        },
      },
    };
  },

  async getUserProfile(): Promise<UserProfile> {
    // Mock implementation - replace with actual API call
    return {
      username: 'johndoe',
      fullName: 'John Doe',
      notificationEmail: 'john@example.com',
      enableNotification: true,
      bio: '',
      contactNumber: '+1 (936) 514-1641'
    };
  },

  // ... updateUserProfile remains the same ...

  getMe: async (token: string): Promise<UserModel> => {
    await delay(500); // Simulate API delay
    if (!token.startsWith('mock_token_')) {
      throw new Error('Invalid token');
    }
    return {
      id: '123456789',
      email: 'user@example.com',
      role: 'admin',
      createdAt: '2023-01-01T00:00:00Z',
      lastLogin: new Date().toISOString(),
      profile: {
        username: 'johndoe',
        fullName: 'John Doe',
        notificationEmail: 'user@example.com',
        enableNotification: true,
        bio: '',
        contactNumber: '+1 (936) 514-1641',
      },
    };
  },
  async updateUserProfile(profile: Partial<UserProfile>): Promise<void> {
    // Mock implementation - replace with actual API call
    console.log('Profile updated:', profile);
    // In a real implementation, you would send this data to your backend
  },

  
};