/* AnimationPopup.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: AnimationPopup.js handles the display and functionality of the popup that appears
  when a user clicks a user preset, a defualt preset, or submits a custom list.

Acknowledgments: Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
*/



import React from "react";
import './AnimationPopup.css';
import Deck from "../AnimationDeck/Deck";
import audioTest from "../../sounds/carddeckshuffle.wav";

/* 
AnimationPopup: 

A popup containing audio and the animation produced from the Deck componnet. This is where
  we contain our animation. The width and height of the pop up are handled by the css style
  file. 

Params:
  handlClose(function), handles closing of the popup 
  result (string/int), result of getting a random decision from a preset/custom list
Returns: A div containing rng card animation and audio
*/
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