import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDb';
import { spiritSchema } from '@/lib/validation';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ← Promise!
) {
  try {
    const { id } = await params; 
    const spiritId = parseInt(id, 10);
    
    const spirit = mockDB.getById(spiritId);
    
    if (!spirit) {
      return NextResponse.json(
        { error: `Spirit with id ${spiritId} not found` },
        { status: 404 }
      );
    }
    
    const validationResult = spiritSchema.safeParse(spirit);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Data validation failed',
          details: validationResult.error.format() 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(validationResult.data);
    
  } catch (error) {
    console.error('GET spirit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}