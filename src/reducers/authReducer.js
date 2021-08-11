import { types } from "../types/types";

const initialState = {
  logged:false,
  checking:true
}


export const authReducers = (state = initialState, action)=>{

  switch (action.type) {
   case types.Login:
    return{
     ...state,
     ...action.payload,
     logged:true,
     checking:false
    }
   case types.logout:
     return{
       logged:false,
       checking:false
     }
   case types.authFinishChecking:
     return {
       ...state,
       checking:false,
     }
   default:
    return state;
  }


}