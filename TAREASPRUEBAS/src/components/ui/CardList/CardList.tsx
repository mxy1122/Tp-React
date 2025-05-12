import styles from './CardList.module.css'
import type { FC } from 'react';
import type { ITareas } from "../../../types/iTareas"
import { useTareas } from '../../../hooks/useTareas';


type ICardList = {

    tarea:ITareas
    handleOpenModalEdit:(tarea : ITareas)=>void 
    

}


export const CardList: FC<ICardList> = ({tarea,handleOpenModalEdit}) => {
    
        const {eliminarTarea} = useTareas()
        const eliminarTareaporid = () =>{

            eliminarTarea(tarea.id!);

        }

        const editarTarea = () =>{

            handleOpenModalEdit(tarea);

        }

    return (

    <div  className={styles.containerCard}>
        <div>
            
            <h3> Titulo :{tarea.titulo}</h3>
            <p> Descripcion :{tarea.descripcion}</p>
            <p><b>Fecha Limite :{tarea.fechaLimite}</b></p>

        </div>

        <div className={styles.containerButton}>

            <button onClick={editarTarea}>Editar</button>
            <button onClick={eliminarTareaporid}>Eliminar</button>

        </div>
    
    </div>
  
)
}
