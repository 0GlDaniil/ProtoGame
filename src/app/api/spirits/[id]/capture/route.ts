import { NextRequest, NextResponse } from 'next/server';
import { mockDB } from '@/lib/mockDb';
import { spiritSchema } from '@/lib/validation';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;

    const spiritId = parseInt(id, 10);
    
    const shouldFail = Math.random() < 0.3;
    
    if (shouldFail) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Capture failed! Spirit escaped.' 
        },
        { status: 500 }
      );
    }
    
    const updatedSpirit = mockDB.captureSpirit(spiritId);
    
    const validation = spiritSchema.safeParse(updatedSpirit);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid spirit data after capture' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: validation.data
    });
    
  } catch (error) {
    console.error('Capture error:', error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Spirit not found' 
      },
      { status: 404 }
    );
  }
}