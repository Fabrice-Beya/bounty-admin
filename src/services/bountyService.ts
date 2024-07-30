import axios from 'axios';
import { Bounty, CreateBountyRequest, UpdateBountyRequest } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const bountyService = {
  getAllBounties: async (): Promise<Bounty[]> => {
    const response = await axios.get(`${API_URL}/bounties`);
    return response.data;
  },

  getBountyById: async (id: string): Promise<Bounty> => {
    const response = await axios.get(`${API_URL}/bounties/${id}`);
    return response.data;
  },

  createBounty: async (bountyData: CreateBountyRequest): Promise<Bounty> => {
    const response = await axios.post(`${API_URL}/bounties`, bountyData);
    return response.data;
  },

  updateBounty: async (bountyData: UpdateBountyRequest): Promise<Bounty> => {
    const response = await axios.put(`${API_URL}/bounties/${bountyData.id}`, bountyData);
    return response.data;
  },

  deleteBounty: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/bounties/${id}`);
  },

  searchBounties: async (query: string): Promise<Bounty[]> => {
    const response = await axios.get(`${API_URL}/bounties/search`, { params: { query } });
    return response.data;
  },
};