import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdateNotes, startUploadImages } from "../../actions/note";

const NoteAppBar = () => {
  const {active} = useSelector(state => state.note);
  const dispatch = useDispatch();
   
   const handleUpdateNote = () => {
      dispatch(startUpdateNotes());
   }
  
   const dateActive = moment(active.date);

  const  handleImages = () => {
     document.querySelector("#fileUpload").click();
  } 

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    if(file){
      dispatch(startUploadImages(file));
    }
  } 

  return (
    <nav className=" navbar-dark d-flex bg-success rounded-3 p-1">
      <button
        className="btn btn-dark ms-1 nav-item"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBackdrop"
        aria-controls="offcanvasWithBackdrop"
      >
       <i className="fas fa-bars"></i>
      </button>
      <div className="container-fluid  d-flex d-flex justify-content-between">
        <h4 className="navbar-brand">{dateActive.format("LL")}</h4>
        <div>
          <input 
            type="file" 
            id="fileUpload"
            name="file"
            style={{display:"none"}}
            onChange={handleUploadImg}
          />
          <button 
            className="btn btn-outline-light me-2"
            onClick={handleImages}
            >Picture</button>
          <button 
            className="btn btn-outline-light "
            onClick={handleUpdateNote}
            >
            Save</button>
        </div>
      </div>
    </nav>
  );
};

export default NoteAppBar;
