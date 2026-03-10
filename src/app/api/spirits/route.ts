import { NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDb';
import { spiritSchema } from '@/lib/validation';

export async function GET() {
  try {
    // Получаем данные
    const spirits = mockDB.getAll();
    
    // ВАЛИДАЦИЯ (по ТЗ обязательно)
    const validationResult = spiritSchema.array().safeParse(spirits);
    
    if (!validationResult.success) {
      // Данные не прошли валидацию
      return NextResponse.json(
        { 
          error: 'Data validation failed',
          details: validationResult.error.format() 
        },
        { status: 500 }
      );
    }
    
    // Данные валидны
    return NextResponse.json(validationResult.data);
    
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}