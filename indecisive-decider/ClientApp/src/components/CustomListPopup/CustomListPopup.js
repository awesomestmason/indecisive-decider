// Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import './CustomListPopup.css';

const Popup = props => {
  return (
    <div className="popup-box ">
      <div className="box center">
        <span className="close-icon" onClick={props.handleClose}><b>x</b></span>

        <div className=" center">
            {props.content}
        </div>
        
      </div>
    </div>
  );
};
 
export default Popup;