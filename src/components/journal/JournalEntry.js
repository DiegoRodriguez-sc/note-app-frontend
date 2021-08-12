import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { noteActive } from "../../actions/note";

const JournalEntry = ({uid, ...note}) => {

  const {title, body, date, img} = note;
  const noteDate = moment(date); 

  const dispatch = useDispatch();

  const handleActiveNote = () => {

    dispatch(noteActive(uid,note));

  }
  
  return (
    <div 
      className="d-flex justify-content-between mb-3 overflow-hidden p-1" 
      style={{height:"70px",width:"100%", border:"1px solid black", cursor:"pointer"}}
      onClick={handleActiveNote}
      >
      {img && <div
        className="img-fluid"
        style={{
          backgroundSize: "cover",
          backgroundRepeat:"no-repeat",
          backgroundImage: `url(${img})`,
          width:"90px"
        }}
      ></div>}

      <div className="ms-2">
        <p className="">{title}</p>
        <p className="">{body}</p>
      </div>

      <div className="">
        <span>{ noteDate.format("Do")}</span>
        <h5>{ noteDate.format("MMM")}</h5>
      </div>
    </div>
  );
};

export default JournalEntry;
