/* EditListPopUp.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: EditListPopUp.js handles the display and functionality of the popup that appears
  when a user clicks the edit button on a card.

Acknowledgments: Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
*/

import React from "react";
import './EditListPopUp.css';
/* 
EditListPopUp: 

A popup containing a text area which auto-fills, according to the content of the preset the
  user has decided to edit, and a button to submit any changes made to the list inside of the
  text area. Any changes made/not made are then sent to the back-end on clicking "Submit" 
  to modify the preset of the same name and ID with the new list data. 

Params: 
  handlClose(function), handles closing of the popup 
  onEditChange(function), keeps track of changes to list in the text area
  onEditSubmit(function), sends list data to back-end
  editInput(string), List of items inside the preset
  editName(string), Name of Preset
  editID (int), Id of preset
Returns: A div containing a text area and a button to submit edited presets
*/
const EditListPopup = ({handleClose, onEditChange, onEditSubmit, editInput, editName, editID}) => {
  return (
    <div className="editPopup-box">
      <div className="editBox center">
        <span className="editClose-icon" onClick={handleClose}><b>x</b></span>

        <div className=" center">
          <b className="white">Edit your list</b>
            <p></p>
            <textarea 
              className="form-control b pa2 input-reset ba bg-black white  w-100" 
              style={{resize: 'vertical'}} 
              onChange={onEditChange} 
              rows="15"
              cols="45" 
              id="editList"
              value={editInput}>
            </textarea>
            <p></p>
            
            <button
              className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer dib"
              onClick={() => onEditSubmit(editID, editName)}>
              Submit            
            </button>
        </div>
        
      </div>
    </div>
  );
};
 
export default EditListPopup;