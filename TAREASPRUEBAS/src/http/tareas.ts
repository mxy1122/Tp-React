import axios from "axios";
import type { ITareas } from "../types/iTareas";

const API_URL = "http://localhost:3000/tareas";


export const getAlltareas = async () => {
    
    try {

        const response = await axios.get(API_URL);
        return response.data;
        
    } catch (error) {

        console.log(error);

    }

};

export const PostnuevaTarea = async (nuevaTarea:ITareas) => {
    
    try {

        const response = await axios.post<ITareas>(API_URL,{...nuevaTarea,});
        return response.data;
        
    } catch (error) {

        console.log(error);

    }

};

export const EditarTarea = async (tareaActualizada:ITareas) => {
    
    try {

        const response = await axios.put<ITareas>(`${API_URL}/${tareaActualizada.id}`,{

        ...tareaActualizada,

        });
        return response.data;
        
    } catch (error) {

        console.log(error);

    }

};


export const EliminarTareaporID = async (IDTareas:string) => {
    
    try {

        const response = await axios.delete<ITareas>(`${API_URL}/${IDTareas}}`);
        return response.data;
        
    } catch (error) {

        console.log(error);

    }

};