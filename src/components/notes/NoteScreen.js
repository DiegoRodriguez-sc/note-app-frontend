import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import NoteAppBar from "./NoteAppBar";
import "../../styles/note-screen.css";
import { useRef } from "react";
import { noteActive, startDeleteNote } from "../../actions/note";

const NoteScreen = () => {

  const dispatch = useDispatch();

  const {active} = useSelector(state => state.note);
  const [ formValues, handleInputChange, reset ] = useForm(active);
  const {title, body} = formValues;

  const activeId = useRef(active.id);

  useEffect(() => {
    if(active.id !== activeId.current){
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);
  useEffect(() => {
    dispatch(noteActive(formValues.id,{...formValues}));
  }, [dispatch, formValues]);

  const handleDeleteNote = () => {
    dispatch(startDeleteNote());
  }

  return (
   <Fragment>
      <NoteAppBar />
      <div className="bg-light border rounded-3 p-3 mt-3 d-flex flex-column h-100 " style={{minHeight:"90%",maxHeight:"90%"}}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control form-control-lg"
              id="floatingTitle"
              name="title"
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={handleInputChange}
            />
            <label htmlFor="floatingTitle">Title</label>
          </div>
          <div className="form-floating mh-100" style={{ height: "100%" }}>
            <textarea
              className="form-control mh-100"
              placeholder="What happened today?"
              id="floatingTextarea"
              name="body"
              value={body}
              onChange={handleInputChange}
              style={{ height: "100%" }}
            ></textarea>
            <label htmlFor="floatingTextarea">What happened today?</label>
          </div>
          {
            active.img 
              && <img
                className="img-thumbnail"
                src={`${active.img}`}
                alt=""
              />
          }
          <div className="d-grid footer mt-auto">
            <div 
              className="container text-center btn btn-danger"
              onClick={handleDeleteNote}
              >Delete</div>
          </div>
        </div>
    </Fragment>
  );
};

export default NoteScreen;
