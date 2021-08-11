import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { startCreateNote } from "../../actions/note";
import JournalEntries from "./JournalEntries";

const SideBar = () => {
  
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
  
    dispatch(startLogout());
  };

  const handleCreateNote = () => {

    dispatch(startCreateNote());

  }


  return (
    <div
      className="offcanvas offcanvas-start bg-dark text-light"
      tabIndex="-1"
      id="offcanvasWithBackdrop"
      aria-labelledby="offcanvasWithBackdropLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="far fa-user me-2"></i>
              {name}
            </button>
            <ul className="dropdown-menu  " aria-labelledby="dropdownMenu2">
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="text-center mt-4" onClick={handleCreateNote} style={{cursor:"pointer"}}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <div className="offcanvas-body">
        <hr />
        <JournalEntries />
        <hr />
      </div>
    </div>
  );
};

export default SideBar;
