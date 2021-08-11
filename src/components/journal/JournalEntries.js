import React from "react";
import { useSelector } from "react-redux";
import JournalEntry from "./JournalEntry";

const JournalEntries = () => {
 
  const {notes} = useSelector(state => state.note);
 


  return (
    <div>
      {
       notes.map((note) => (
        <JournalEntry 
          key={note.id} 
          {...note}
          />
      ))
      }
    </div>
  );
};

export default JournalEntries;
