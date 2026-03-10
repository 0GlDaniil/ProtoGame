import { FC } from "react";
import styles from "./SpiritList.module.scss"
import SpiritCard from "../SpiritCard/SpiritCard";
import { spirit } from "@/globals/types/spirits";

interface SpiritListProps {
  list: spirit[]
}


const SpiritList: FC<SpiritListProps> = ({list}) => {
  return ( 
    <div className={styles.immer}>
      <ul className={styles.list}>
        {
          list.map((el) => {
            return <SpiritCard key={el.id} id={el.id} name={el.name} status={el.status} location={el.location} danger={el.danger}/>
          })
        }
      </ul>
    </div>
  );
}

export default SpiritList;