import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import { store } from './store/store';
import "./styles/base.css";



const NoteApp = () => {
 return (
  <Provider store={store}>
 <AppRouter />
  </Provider>
 );
}

export default NoteApp;
