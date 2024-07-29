import { TipCategory, BountyCategory, Summary } from '../types';

class SummaryService {
  async getSummary(): Promise<Summary> {
    // Mock data - replace with actual API call later
    return {
      totalBounties: 14,
      totalTips: 11,
      mostCommonTipCategory: TipCategory.Sighting,
      mostCommonBountyCategory: BountyCategory.Smuggling,
      totalRevenue: 1818.80,
      totalVendors: 11,
      totalShops: 14,
    };
  }
}

export const summaryService = new SummaryService();