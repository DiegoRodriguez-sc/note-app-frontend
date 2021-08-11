import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";


// Login
export const startLogin = (email, password) => {
  return async (dispatch) => {

    dispatch(startLoading());
    try {
      
      const resp = await fetchSinToken("auth/login", { email, password }, "POST");
      const body = await resp.json();
  
      if (body.status) {
        console.log(body);
        localStorage.setItem("token", body.token);
        dispatch(
          login({
            uid: body.usuario.uid,
            name:body.usuario.name
          })
        );
        dispatch(finishLoading());
  
      }else {
        console.log(body.msg);
        dispatch(finishLoading());
        dispatch(finishChecking());
      }

    } catch (error) {
      console.log(error);
      dispatch(finishLoading());
      dispatch(finishChecking());
    }
  };
};

// revalidar token
export const startRevalidation = () => {
  return async (dispatch) => {

    try {
      
      const resp = await fetchConToken("auth/renew");
      const body = await resp.json();
  
      if (body.status) {
  
        localStorage.setItem("token", body.token);
  
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
          })
        );
      }else{
        dispatch(finishChecking());
        dispatch(logout());
      }

    } catch (error) {
      console.log(error);
      dispatch(finishChecking());
      dispatch(logout());
    }
  };
};


const login = (user) => ({
  type: types.Login,
  payload: user,
});


// checking
const finishChecking = () => ({
   type:types.authFinishChecking
});





// logout
export const startLogout = () => {
  return (dispatch) => {
      localStorage.clear();
      dispatch(logout());
  };
};

const logout = () =>({
   type:types.logout
})




// loading
const startLoading = () => ({
  type: types.uiStartLoading,
});

const finishLoading = () => ({
  type: types.uiFinishLoading,
});


