import { initialSpirits } from './mock-data';
import { spirit, dangerLevel } from '@/globals/types/spirits';

export class MockDB {
  private spirits: spirit[] = [...initialSpirits];
  
  getAll(): spirit[] {
    return [...this.spirits];
  }
  
  getById(id: number): spirit | undefined {
    return this.spirits.find(s => s.id === id);
  }
  
  captureSpirit(id: number): spirit {
    const spirit = this.getById(id);
    if (!spirit) {
      throw new Error(`Spirit ${id} not found`);
    }
    
    spirit.status = 'captured';
    spirit.danger = 'none';
    
    return spirit;
  }
  
  // Обновить случайного духа (для SSE)
  updateRandomSpiritThreat(): spirit | null {
    const activeSpirits = this.spirits.filter(s => s.status === 'active');
    if (activeSpirits.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * activeSpirits.length);
    const spirit = activeSpirits[randomIndex];
    
    // Увеличиваем уровень угрозы
    const levels: dangerLevel[] = ['low', 'medium', 'high', 'critical'];
    const currentIndex = levels.indexOf(spirit.danger);
    const newIndex = Math.min(currentIndex + 1, levels.length - 1);
    
    spirit.danger = levels[newIndex];
    
    return spirit;
  }
  
  // Статистика (опционально)
  getStats() {
    const total = this.spirits.length;
    const active = this.spirits.filter(s => s.status === 'active').length;
    const captured = total - active;
    
    return { total, active, captured };
  }
}

// Создаём единственный экземпляр
export const mockDB = new MockDB();