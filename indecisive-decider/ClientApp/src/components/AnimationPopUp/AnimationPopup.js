// Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import './AnimationPopup.css';
import Deck from "../AnimationDeck/Deck";
import audioTest from "../../sounds/carddeckshuffle.wav";

const AnimationPopup = ({handleClose, result}) => {
  return (
    <div className="animPopup-box ">
      <div className="animBox">
        <span className="animClose-icon" onClick={handleClose}><b>x</b></span>
        <audio src={audioTest} autoPlay/>
        <Deck result={result}/> {/* //Our Deck of Cards */}
      </div>
    </div>
  );
};
 
export default AnimationPopup;