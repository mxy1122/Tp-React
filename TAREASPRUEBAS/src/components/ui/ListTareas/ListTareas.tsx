import { useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareaStore'
import styles from './ListTareas.module.css'
import { CardList } from '../CardList/CardList';
import { Modal } from '../Modals/Modal';
import type { ITareas } from '../../../types/iTareas';
import { useTareas } from '../../../hooks/useTareas';

export const ListTareas = () => {

const setTareaActiva = tareaStore((state) => state.setTareaActiva);


    const {getTareas,tareas} = useTareas();

    useEffect(() => {
    
        getTareas();
    
    },[]);

    const [openModalTareas, setOpenModalTareas] = useState(false);

    const handleOpenModalEdit = (tarea:ITareas) => {

      setTareaActiva(tarea);
      setOpenModalTareas(true);

    }

    const handleCloseModal = () => {
        setOpenModalTareas(false);
    }

    
  return (
    <>  
    <div className={styles.containerPrincipalListTareas}>
        <div className={styles.containerTitleAndButton}>
            <h2>ListTareas</h2>
            <button onClick={() => {setOpenModalTareas(true)}}>Agregar tarea</button>
        </div>
        <div className={styles.containerList}>
            {tareas.length > 0 ?(
              tareas.map((el) => 

                   <CardList handleOpenModalEdit={handleOpenModalEdit} tarea={el}/>
             )): (  
                <div>
                    <p>No hay tareas</p>
                </div>
            )}
        </div>
      </div>
      { openModalTareas && <Modal handleCloseModal={handleCloseModal} />}
    </>  
  );
};
