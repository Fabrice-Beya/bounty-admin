import { v4 as uuidv4 } from 'uuid';
import { Tip, CreateTipRequest, UpdateTipRequest, TipStatus, TipCategory } from '../types';

class TipService {
  private tips: Tip[] = [
    {
      id: '1',
      title: 'Suspicious activity near the docks',
      description: 'Observed multiple unmarked vehicles loading cargo late at night',
      category: TipCategory.Sighting,
      datetime: new Date('2023-06-15T22:30:00'),
      location: 'Harbor District, Pier 7',
      status: TipStatus.New,
      createdAt: new Date('2023-06-16T09:00:00'),
      updatedAt: new Date('2023-06-16T09:00:00')
    },
    {
      id: '2',
      title: 'Potential smuggling route identified',
      description: 'Local informant provided information about a new smuggling route through the mountains',
      category: TipCategory.Intelligence,
      datetime: new Date('2023-06-14T14:00:00'),
      location: 'Mountain Pass, 20 miles north of the city',
      status: TipStatus.InProgress,
      createdAt: new Date('2023-06-14T16:30:00'),
      updatedAt: new Date('2023-06-15T10:00:00')
    }
  ];

  async getAllTips(): Promise<Tip[]> {
    return this.tips;
  }

  async getTipById(id: string): Promise<Tip | undefined> {
    return this.tips.find(tip => tip.id === id);
  }

  async createTip(tipData: CreateTipRequest): Promise<Tip> {
    const newTip: Tip = {
      ...tipData,
      id: uuidv4(),
      status: TipStatus.New,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tips.push(newTip);
    return newTip;
  }

  async updateTip(tipData: UpdateTipRequest): Promise<Tip | undefined> {
    const index = this.tips.findIndex(tip => tip.id === tipData.id);
    if (index !== -1) {
      this.tips[index] = {
        ...this.tips[index],
        ...tipData,
        updatedAt: new Date()
      };
      return this.tips[index];
    }
    return undefined;
  }

  async deleteTip(id: string): Promise<boolean> {
    const initialLength = this.tips.length;
    this.tips = this.tips.filter(tip => tip.id !== id);
    return this.tips.length < initialLength;
  }
}

export const tipService = new TipService();