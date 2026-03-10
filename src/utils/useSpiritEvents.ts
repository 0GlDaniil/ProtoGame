'use client';

import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Spirit } from '@/lib/validation';

interface UseSpiritEventsProps {
  onConnected?: () => void;
  onDisconnected?: () => void;
  onSpiritUpdated?: (spirit: Spirit) => void;
}

export const useSpiritEvents = ({
  onConnected,
  onDisconnected,
  onSpiritUpdated
}: UseSpiritEventsProps = {}) => {
  const queryClient = useQueryClient();
  
  // Обновление духа в кэше
  const updateSpiritInCache = useCallback((updatedSpirit: Spirit) => {
    queryClient.setQueryData<Spirit[]>(['spirits'], (oldSpirits = []) =>
      oldSpirits.map(spirit =>
        spirit.id === updatedSpirit.id ? updatedSpirit : spirit
      )
    );
    
    // Колбэк при обновлении
    if (onSpiritUpdated) {
      onSpiritUpdated(updatedSpirit);
    }
  }, [queryClient, onSpiritUpdated]);
  
  useEffect(() => {
    let eventSource: EventSource | null = null;
    
    const connectSSE = () => {
      eventSource = new EventSource('/api/events');
      
      eventSource.onopen = () => {
        console.log('SSE connected');
        if (onConnected) onConnected();
      };
      
      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'spirit_updated':
              updateSpiritInCache(data.data);
              break;
              
            case 'connected':
              console.log('SSE handshake:', data.message);
              break;
              
            case 'heartbeat':
              // Поддержание соединения
              break;
          }
        } catch (error) {
          console.error('SSE parse error:', error);
        }
      };
      
      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        if (onDisconnected) onDisconnected();
        eventSource?.close();
        
        // Переподключение через 3 секунды
        setTimeout(connectSSE, 3000);
      };
    };
    
    // Начинаем подключение
    connectSSE();
    
    // Очистка
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [updateSpiritInCache, onConnected, onDisconnected]);
};