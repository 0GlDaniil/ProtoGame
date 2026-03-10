import { spiritSchema } from './validation';
import type { Spirit } from './validation';

export const spiritsAPI = {
  // Получить всех духов
  getAll: async (): Promise<Spirit[]> => {
    const response = await fetch('/api/spirits');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch spirits: ${response.status}`);
    }
    
    const data = await response.json();
    const result = spiritSchema.array().safeParse(data);
    
    if (!result.success) {
      console.error('Validation error:', result.error);
      throw new Error('Invalid data from server');
    }
    
    return result.data;
  },
  
  // Capture духа (позже добавим)
  capture: async (spiritId: number): Promise<Spirit> => {
    const response = await fetch(`/api/spirits/${spiritId}/capture`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Capture failed');
    }
    
    const data = await response.json();
    const result = spiritSchema.safeParse(data);
    
    if (!result.success) {
      throw new Error('Invalid response after capture');
    }
    
    return result.data;
  }
};