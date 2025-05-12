import { useEffect,type FC, useState, type ChangeEvent, type FormEvent, } from 'react';
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import type { ITareas } from '../../../types/iTareas';
import { useTareas } from '../../../hooks/useTareas';

type IModal = {

    handleCloseModal: VoidFunction

};

const intialState:ITareas = {

    titulo: "",
    descripcion: "",
    fechaLimite: "",

}

export const Modal : FC<IModal> = ( {handleCloseModal} ) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva);
    const setTareaActiva = tareaStore((state) => state.setTareaActiva);

    const {crearTarea, putEditarTarea} = useTareas();

    const [formValues, setFormValues] = useState<ITareas>(intialState);

    useEffect(() =>{if(tareaActiva) setFormValues(tareaActiva)},[]);


    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target;

        setFormValues((prev) => ({
            ...prev,
            [`${name}`]: value,
        }));    

    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        if(tareaActiva){
            putEditarTarea(formValues);
        }else{
            crearTarea({...formValues, id: new Date().toDateString() });
        }
        setTareaActiva(null);
        handleCloseModal();
    
    };


    console.log(formValues);


    return (
    <div className={styles.containerPrincipalModal}>
        <div className={styles.contentPopUP}>
            <div>        
            
                <h3>{tareaActiva? "Editar Tarea" : "Crear Tarea"}</h3>

            </div>
        

        <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div>
            
                <input placeholder='Ingrese el titulo' 
                type="text" required 
                onChange={handleChange}
                value={formValues.titulo} 
                autoComplete='off' 
                name='titulo' />
                
                <textarea placeholder='Ingrese la descripcion' 
                required onChange={handleChange}
                value={formValues.descripcion} 
                name="descripcion" />


                <input  placeholder ='Ingrese la fecha limite' 
                type="date" required
                onChange={handleChange} 
                value={formValues.fechaLimite} 
                autoComplete='off' 
                name='fechaLimite' />
            
            </div>

            <div className={styles.containerButton}>
                <button onClick={handleCloseModal}>Cancelar</button>
                <button type='submit'>{tareaActiva? "Editar Tarea" : "Crear Tarea"}</button>
            </div>

            </form>

        </div>

    </div>
    )
}
