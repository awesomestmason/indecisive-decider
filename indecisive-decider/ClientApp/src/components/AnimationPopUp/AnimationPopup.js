// Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import './AnimationPopup.css';
import Deck from "../AnimationDeck/Deck";

const AnimationPopup = ({handleClose, onListNameChange, onListNameSubmit}) => {
  return (
    <div className="animPopup-box ">
      <div className="animBox">
        <span className="animClose-icon" onClick={handleClose}><b>x</b></span>
        <Deck />
        {/* <div className="">
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
            
        </div> */}
        
      </div>
    </div>
  );
};
 
export default AnimationPopup;