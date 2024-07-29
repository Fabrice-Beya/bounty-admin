import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  authorization?: boolean;
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  username: string;
  fullName: string;
  notificationEmail: string;
  enableNotification: boolean;
  bio: string;
  contactNumber: string;
}

export interface UserModel {
  id: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin: string;
  profile: UserProfile;
}

export interface AuthResponse {
  token: string;
  user: UserModel;
}

// New Bounty-related types
export enum BountyStatus {
  Open = 'open',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum BountyPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: BountyStatus;
  createdAt: string;
  expiresAt?: string;
  createdBy: string;
  category: string;
  priority: BountyPriority;
}

export interface CreateBountyRequest {
  title: string;
  description: string;
  reward: number;
  expiresAt?: string;
  category: string;
  priority: BountyPriority;
}

export interface UpdateBountyRequest {
  id: string;
  title?: string;
  description?: string;
  reward?: number;
  status?: BountyStatus;
  expiresAt?: string;
  category?: string;
  priority?: BountyPriority;
}

export enum TipStatus {
  New = 'New',
  InProgress = 'In Progress',
  Verified = 'Verified',
  Closed = 'Closed',
  Rejected = 'Rejected'
}

export enum TipCategory {
  General = 'General',
  Sighting = 'Sighting',
  Intelligence = 'Intelligence',
  Evidence = 'Evidence',
  Other = 'Other'
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: TipCategory;
  datetime: Date;
  location: string;
  status: TipStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTipRequest {
  title: string;
  description: string;
  category: TipCategory;
  datetime: Date;
  location: string;
}

export interface UpdateTipRequest {
  id: string;
  title?: string;
  description?: string;
  category?: TipCategory;
  datetime?: Date;
  location?: string;
  status?: TipStatus;
}

export enum BountyCategory {
  Smuggling = 'Smuggling',
  Piracy = 'Piracy',
  Theft = 'Theft',
  Fraud = 'Fraud',
  Other = 'Other'
}

export interface Summary {
  totalBounties: number;
  totalTips: number;
  mostCommonTipCategory: TipCategory;
  mostCommonBountyCategory: BountyCategory;
  totalRevenue: number;
  totalVendors: number;
  totalShops: number;
}