import { NextRequest } from 'next/server';
import { mockDB } from '@/lib/mockDb';
import { spirit } from '@/globals/types/spirits';

interface SSEEvent {
  type: string;
  data?: spirit;
  message?: string;
  timestamp: string;
}

// GET /api/events - Server-Sent Events endpoint
export async function GET(request: NextRequest) {
  // Создаём ReadableStream для SSE
  const stream = new ReadableStream({
    async start(controller) {
      // Функция отправки данных клиенту
      const sendEvent = (data: SSEEvent) => {
        const eventData = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(eventData));
      };
      
      // Отправляем heartbeat каждые 30 сек (опционально)
      const heartbeatInterval = setInterval(() => {
        sendEvent({ type: 'heartbeat', timestamp: new Date().toISOString() });
      }, 30000);
      
      // Основной интервал: обновляем случайного духа каждые 5 сек
      const updateInterval = setInterval(() => {
        try {
          const updatedSpirit = mockDB.updateRandomSpiritThreat();
          
          if (updatedSpirit) {
            sendEvent({
              type: 'spirit_updated',
              data: updatedSpirit,
              timestamp: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error('SSE update error:', error);
        }
      }, 5000); // 5 секунд
      
      // Очистка при отключении клиента
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeatInterval);
        clearInterval(updateInterval);
        controller.close();
      });
      
      // Отправляем начальное событие
      sendEvent({ 
        type: 'connected', 
        message: 'SSE connection established',
        timestamp: new Date().toISOString()
      });
    },
  });
  
  // Возвращаем SSE response
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}