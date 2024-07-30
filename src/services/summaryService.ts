import axios from 'axios';
import { Summary } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const summaryService = {
  getSummary: async (): Promise<Summary> => {
    const response = await axios.get(`${API_URL}/summary`);
    return response.data;
  },
};