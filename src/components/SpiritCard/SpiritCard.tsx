'use client';

import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./SpiritCard.module.scss"
import { spirit } from "@/globals/types/spirits";
import { Danger } from "@/globals/types/enums";

type SpiritCardProps = spirit;

const SpiritCard: FC<SpiritCardProps> = ({id, name, location, danger, status}) => {
  const queryClient = useQueryClient();
  
  const captureMutation = useMutation({
    mutationFn: async (spiritId: number) => {
      const response = await fetch(`/api/spirits/${spiritId}/capture`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Capture failed');
      }
      
      return response.json();
    },
    
    onMutate: async (spiritId) => {
      await queryClient.cancelQueries({ queryKey: ['spirits'] });

      const previousSpirits = queryClient.getQueryData<spirit[]>(['spirits']);

      queryClient.setQueryData<spirit[]>(['spirits'], (old = []) =>
        old.map(s =>
          s.id === spiritId
            ? {
                ...s,
                status: 'captured',
                danger: 'none',
              }
            : s
        )
      );

      return { previousSpirits };
    },
    
    onError: (error, spiritId, context) => {
      if (context?.previousSpirits) {
        queryClient.setQueryData(['spirits'], context.previousSpirits);
      }
      
      console.error(`Capture failed: ${error.message}`);
    },
    
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['spirits'] });
    },
  });

  const handleCapture = () => {
    if (status === 'captured') return;
    captureMutation.mutate(id);
  };

  const dangerColor = Danger[danger as keyof typeof Danger];
  
  const isDisabled = status === 'captured' || captureMutation.isPending;

  return ( 
    <li className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.location}>📍 {location}</span>
      </div>
      
      <div className={styles.info}>
        <span 
          className={styles.dangerBadge}
          style={{
            backgroundColor: dangerColor, 
            color: '#ffffff' 
          }}
        >
          {danger.toUpperCase()}
        </span>
        
        <span className={`${styles.status} ${styles[status]}`}>
          {status === 'active' ? '🟢 Active' : '✅ Captured'}
        </span>
      </div>
      
      <button 
        className={`${styles.btn} ${isDisabled ? styles.disabled : ''}`}
        onClick={handleCapture}
        disabled={isDisabled}
      >
        {captureMutation.isPending ? 'Capturing...' : 
        status === 'captured' ? 'Captured' : '🎯 Capture'}
      </button>
    </li>
  );
}

export default SpiritCard;