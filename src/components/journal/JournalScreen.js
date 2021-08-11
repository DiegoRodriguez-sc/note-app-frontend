import React from 'react';
import { useSelector } from 'react-redux';
import NoteScreen from '../notes/NoteScreen';
import NothingSelect from './NothingSelect';
import SideBar from './SideBar';

const JournalScreen = () => {
 const {active} = useSelector(state => state.note);


 return (
  <div className="container-fluid vh-100 bg-dark">
          <SideBar />
          
          {
            active
            ? <NoteScreen />
            : <NothingSelect />
          }
    
  </div>
 );
}

export default JournalScreen;
