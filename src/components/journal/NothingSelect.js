import React from 'react';

const NothingSelect = () => {
 return (
  <div style={{height:"90%"}}>
   <button
        className="btn btn-dark ms-1 nav-item"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBackdrop"
        aria-controls="offcanvasWithBackdrop"
      >
        <i className="fas fa-sliders-h"></i>
   </button>
  <div className="m-0 row d-flex justify-content-center align-items-center h-100">
  <h1 className="col-auto bg-light text-center p-3 rounded-3">Please select a note <i className="far fa-hand-pointer"></i></h1>
  </div>
  </div>
 );
}

export default NothingSelect;
