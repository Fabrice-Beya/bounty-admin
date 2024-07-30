import axios from 'axios';
import { Tip, CreateTipRequest, UpdateTipRequest } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const tipService = {
  getAllTips: async (): Promise<Tip[]> => {
    const response = await axios.get(`${API_URL}/tips`);
    return response.data;
  },

  getTipById: async (id: string): Promise<Tip> => {
    const response = await axios.get(`${API_URL}/tips/${id}`);
    return response.data;
  },

  createTip: async (tipData: CreateTipRequest): Promise<Tip> => {
    const response = await axios.post(`${API_URL}/tips`, tipData);
    return response.data;
  },

  updateTip: async (tipData: UpdateTipRequest): Promise<Tip> => {
    const response = await axios.put(`${API_URL}/tips/${tipData.id}`, tipData);
    const updatedTip = response.data;

    // Send notification for priority, status, or reward changes
    if (tipData.priority || tipData.status || tipData.reward !== undefined) {
      await axios.post(`${API_URL}/tips/${tipData.id}/notify`, {
        priority: tipData.priority,
        status: tipData.status,
        reward: tipData.reward
      });
    }

    return updatedTip;
  },

  deleteTip: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/tips/${id}`);
  },
};