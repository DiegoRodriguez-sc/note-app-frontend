import { fetchConToken } from "../helpers/fetch";
import { uploadImage } from "../helpers/uploadImage";
import { types } from "../types/types";


// crear nota
export const startCreateNote = () => {
     return async(dispatch) => {

         const newNota = {
          title:"",
          body:"",
          date:new Date().getTime(),
          img:""
         }

         const resp = await fetchConToken("note/", newNota, "POST");
         const body = await resp.json();

         if(body.status){
            console.log(body.msg);
            dispatch(noteActive(body.nota.id, newNota));
            dispatch(noteAdd(body.nota.id, newNota));
         }
         
     };
};

// nota activa
export const noteActive = (id, notes) => ({
    type:types.notesActive,
    payload:{
        id,
        ...notes
    }
});

export const noteAdd = (id, note) => ({
    type:types.notesAddNew,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
});

// get notas
export const notesDataBase = () => {
    return async(dispatch, getState) =>{
        const {uid} = getState().auth;
        console.log(uid);
        const resp = await fetchConToken(`note/${uid}`);
        const data = await resp.json();
        console.log(data.results);

        if(data.status){
            dispatch(setNote(data.results));
        }
    };
};


const setNote = (notas) => ({
    type:types.notesLoad,
    payload:notas || []
})



// actualizar nota
export const startUpdateNotes = () => {
    return async(dispatch, getState) => {
        const {active} = getState().note;
        const resp = await fetchConToken(`note/${active.id}`, active, "PUT");
        const body = await resp.json();
        console.log(body)
        if(body.status){
            console.log(body.msg);
            dispatch(refreshNote(body.nota.id, body.nota));
        }else{
            console.log("error");
        }
    }
}

export const refreshNote = (id, note) => ({
    type:types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }
});

// delete nota

export const startDeleteNote = () => {
    return async(dispatch, getState) => {
        const {active } = getState().note;
        const resp = await fetchConToken(`note/${active.id}`, {}, "DELETE");
        const body = await resp.json();
        if(body.status){
            console.log(body.msg);
            dispatch(deleteNote(active.id));
        }else{
            console.log(body);
        }
    };
};

const deleteNote = (id) => ({
    type:types.notesDelete,
    payload:id
})


export const startUploadImages = (file) => {
    return async(dispatch, getState) =>{
      
      const {active} = getState().note;
      const data = await uploadImage(file);
      active.img = data;
      dispatch(startUpdateNotes());
      
    };
};