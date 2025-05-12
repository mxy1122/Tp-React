import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import type { ITareas } from "../types/iTareas";
import { EditarTarea, EliminarTareaporID, getAlltareas, PostnuevaTarea } from "../http/tareas";

export const useTareas = () => {

    const {tareas , setArrayTareas, agregarNuevaTarea,eliminarUnaTarea,editarTarea} = tareaStore (useShallow((state) => ({
      
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarTarea,
        editarTarea: state.editarTarea,


    }))

    );

    const getTareas = async () =>{
        const data = await getAlltareas(); 
            if(data)setArrayTareas(data);
    };

    const crearTarea = async (nuevaTarea:ITareas) => {

        agregarNuevaTarea(nuevaTarea);

        try {
            
        await PostnuevaTarea(nuevaTarea);

        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!);
            console.log(error);    
        }

    }

    
    const putEditarTarea = async (tareaEditada:ITareas) => {

        const estadoAnterior = tareas.find((el) => el.id === tareaEditada.id);

        editarTarea(tareaEditada);

        try {

             await EditarTarea(tareaEditada);

            } catch (error) {

                if (estadoAnterior) editarTarea(estadoAnterior!);
            
                console.log(error);
            }

    }

    const eliminarTarea = async (IdTareas:string) => {

         const estadoAnterior = tareas.find((el) => el.id === IdTareas);

        eliminarUnaTarea(IdTareas);
        
        
        try {
            await  EliminarTareaporID (IdTareas);
        } catch (error) {

            if (estadoAnterior) agregarNuevaTarea(estadoAnterior!); 
            console.log(error);
            
        }
    }


  return {

    getTareas,
    crearTarea,
    putEditarTarea,
    eliminarTarea,
    tareas
  
  };
};
