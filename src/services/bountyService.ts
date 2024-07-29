import { Bounty, CreateBountyRequest, UpdateBountyRequest, BountyStatus, BountyPriority } from '../types';

// Helper function to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial mock data
let bounties: Bounty[] = [
  {
    id: generateId(),
    title: 'Find software vulnerability',
    description: 'Identify and report a critical vulnerability in our software.',
    reward: 1000,
    status: BountyStatus.Open,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    createdBy: 'admin123',
    category: 'software',
    priority: BountyPriority.High,
  },
  {
    id: generateId(),
    title: 'Improve documentation',
    description: 'Enhance and expand our product documentation.',
    reward: 500,
    status: BountyStatus.Open,
    createdAt: new Date().toISOString(),
    createdBy: 'admin456',
    category: 'content',
    priority: BountyPriority.Medium,
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const bountyService = {
  // Get all bounties
  getAllBounties: async (): Promise<Bounty[]> => {
    await delay(500); // Simulate API call delay
    return bounties;
  },

  // Get a single bounty by ID
  getBountyById: async (id: string): Promise<Bounty | undefined> => {
    await delay(300);
    return bounties.find(bounty => bounty.id === id);
  },

  // Create a new bounty
  createBounty: async (bountyData: CreateBountyRequest): Promise<Bounty> => {
    await delay(700);
    const newBounty: Bounty = {
      ...bountyData,
      id: generateId(),
      status: BountyStatus.Open,
      createdAt: new Date().toISOString(),
      createdBy: 'currentUser123', // In a real app, this would come from the authenticated user
    };
    bounties.push(newBounty);
    return newBounty;
  },

  // Update an existing bounty
  updateBounty: async (bountyData: UpdateBountyRequest): Promise<Bounty> => {
    await delay(500);
    const index = bounties.findIndex(bounty => bounty.id === bountyData.id);
    if (index === -1) throw new Error('Bounty not found');
    
    bounties[index] = { ...bounties[index], ...bountyData };
    return bounties[index];
  },

  // Delete a bounty
  deleteBounty: async (id: string): Promise<void> => {
    await delay(400);
    const index = bounties.findIndex(bounty => bounty.id === id);
    if (index === -1) throw new Error('Bounty not found');
    
    bounties.splice(index, 1);
  },

  // Search bounties (simple implementation)
  searchBounties: async (query: string): Promise<Bounty[]> => {
    await delay(600);
    return bounties.filter(bounty => 
      bounty.title.toLowerCase().includes(query.toLowerCase()) ||
      bounty.description.toLowerCase().includes(query.toLowerCase())
    );
  },
};