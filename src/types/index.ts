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
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum BountyPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
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
  category: BountyCategory;
  priority: BountyPriority;
}

export enum BountyCategory {
  TELEGRAM = 'TELEGRAM',
  WHATSAPP = 'WHATSAPP',
  WEB = 'WEB',
  CALL_CENTER = 'CALL_CENTER',
  TEAMS = 'TEAMS',
  GENERAL = 'GENERAL',
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
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  VERIFIED = 'VERIFIED',
  CLOSED = 'CLOSED',
  REJECTED = 'REJECTED',
  PAID = 'PAID'
}

export enum TipCategory {
  GENERAL = 'GENERAL',
  SIGHTING = 'SIGHTING',
  INTELLIGENCE = 'INTELLIGENCE',
  EVIDENCE = 'EVIDENCE',
  OTHER = 'OTHER'
}

export enum TipPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: TipCategory;
  datetime: Date;
  location: string;
  status: TipStatus;
  priority: TipPriority;
  reward: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTipRequest {
  title: string;
  description: string;
  category: TipCategory;
  datetime: Date;
  location: string;
  priority: TipPriority;
  reward: number;
}

export interface UpdateTipRequest {
  id: string;
  title?: string;
  description?: string;
  category?: TipCategory;
  datetime?: Date;
  location?: string;
  status?: TipStatus;
  priority?: TipPriority;
  reward?: number;
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