import { create } from 'zustand'
import type { ITareas } from '../types/iTareas'

interface iTareaStore {

    tareas: ITareas[];
    tareaActiva: ITareas | null;
    setTareaActiva:(tareaActiva:ITareas|null)=>void;
    setArrayTareas:(arraydeTareas: ITareas[]) => void;
    agregarNuevaTarea:(agregarNuevaTarea:ITareas) => void;
    editarTarea:(editarTarea:ITareas) => void;
    eliminarTarea:(IdTarea : string ) => void;

}   

export const tareaStore = create <iTareaStore>((set) => ({


    tareas:[],
    tareaActiva:null,

    //funciones modificadoras

    //agregar un array

    setArrayTareas:(arraydeTareas)=> set(()=>({tareas:arraydeTareas})),

    //agregar una tarea a un array

    agregarNuevaTarea: (nuevaTarea) => set( (state) => ({tareas:[...state.tareas, nuevaTarea]}) ),



    //actualizar una tarea


    editarTarea: (Tareaeditada) => set((state) =>{

        const arregloTareas = state.tareas.map((tarea) => 
            
            tarea.id === Tareaeditada.id ?{...tarea, ...Tareaeditada}:tarea
        
        );
        return {tareas:arregloTareas};
        
        }),

    
    //eliminar una tarea

    eliminarTarea: (IdTarea) => 
        set((state) => {
        const arregloTareas = state.tareas.filter(
            (tarea) => tarea.id !== IdTarea
        );
        return { tareas:arregloTareas };
    }),
    //setear una tarea activa

    setTareaActiva: (tareaActivain) => set(() => ({tareaActiva:tareaActivain}))


}));
