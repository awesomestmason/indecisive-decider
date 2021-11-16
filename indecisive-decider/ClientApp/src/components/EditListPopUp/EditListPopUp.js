// Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import './CustomListPopup.css';

const CustomListPopup = ({handleClose, onListNameChange, onListNameSubmit}) => {
  return (
    <div className="popup-box ">
      <div className="box center">
        <span className="close-icon" onClick={handleClose}><b>x</b></span>

        <div className=" center">
          <b className="white">Give your list a name.</b>
            <p></p>
            <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="listName" 
              name="listName"
              id="listName"
              onChange={onListNameChange}
              />
            <p></p>
            
            <button
              className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer dib"
              onClick={onListNameSubmit}>
              Submit            
            </button>
        </div>
        
      </div>
    </div>
  );
};
 
export default CustomListPopup;