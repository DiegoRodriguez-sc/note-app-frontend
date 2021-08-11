import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { startRevalidation } from '../actions/auth';
import { notesDataBase } from '../actions/note';

import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {

  const dispatch = useDispatch();
  const {logged} = useSelector(state => state.auth);
  const {checking} = useSelector(state => state.auth);

  useEffect(() => {

    dispatch(startRevalidation());
    if(logged){
      dispatch(notesDataBase());
    }
    
  }, [dispatch, logged]);


  if(checking){
    return (
      <div> espere...</div>
    )
  }


 return (
  <Router>
  <div>
    <Switch>
      <PrivateRoute 
        exact path="/" 
        component={JournalScreen} 
        isAuthenticated={logged}  
        />
      <PublicRoute  
        path="/auth" 
        component={AuthRouter} 
        isAuthenticated={logged}  
        />
      
    </Switch>
  </div>
</Router>
 );
}

export default AppRouter;
