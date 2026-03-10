'use client';

import { useQuery } from "@tanstack/react-query";
import Map from "@/components/Map/Map";
import styles from "../app/monitoring/monitoring.module.scss";
import SpiritList from "@/components/SpiritList/SpiritList";
import { useSpiritEvents } from '@/utils/useSpiritEvents';
import { spirit } from "@/globals/types/spirits";
import { spiritsAPI } from "@/lib/api";

export default function Home() {
  // Подключаем SSE хук
  useSpiritEvents({});

  // Загрузка духов
  const {
    data: spirits,
    isLoading,
  } = useQuery({
    queryKey: ['spirits'], 
    queryFn: spiritsAPI.getAll, 
    staleTime: 10000, // 10 секунд
  });
  
  // Подготовка данных для карты
  const spiritsMapData = spirits?.map((el: spirit) => ({
    location: el.location,
    danger: el.danger
  })) || [];
  
  // Loading state
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Initializing spirit monitoring...</p>
      </div>
    );
  }
  
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Map spiritsList={spiritsMapData} />
          <div className={styles.listSection}>
            <div className={styles.sectionHeader}>
              <h2>Spirit Manifestations</h2>
            </div>
            <SpiritList list={spirits || []} />
          </div>
        </div>
      </main>
    </>
  );
}