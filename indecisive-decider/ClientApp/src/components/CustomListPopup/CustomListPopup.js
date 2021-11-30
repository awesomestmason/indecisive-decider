/* CustomListPopup.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description:CustomListPopup.js handles the display and functionality of the popup that appears
  when a user clicks the "Save List" button on the ListTextBox component.

Acknowledgments: Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs

*/
import React from "react";
import {useState} from "react";
import './CustomListPopup.css';

/* 
CustomListPopup:

Takes in the props that sent in from ListTextBox.js and uses them to 
  create the pop-up that has an input area for the name of the list written in 
  ListTextBox's textarea, a "Submit" button for saving it as a custom preset, 
  and a close icon that when pressed uses handleClose, which is a toggle given 
  from ListTextBox that closes the pop-up.

NOTE: The reason it looks like a pop-up is due to the CSS in CustomListPopUp.css

Params:
handlClose(function), handles closing of the popup 
onListNameChange(function), keeps track of changes to the name in the text area
onListNameSubmit(function), sends name data to back-end 
Returns: A div with the popup stylings and features mentioned above that make it work as a popup.
*/
const CustomListPopup = ({handleClose, onListNameChange, onListNameSubmit}) => {
  const [checkString, setCheckString] = useState();

  /*
    handleCheckString:
      Changes the "checkString" state to be whatever was just typed in CustomListPopUp's input. 
    Params: the website DOM's event object, which contains the string inside CustomListPopUp's input. 
    Returns: N/A
  */
  const handleCheckString = (event) => {
    setCheckString(event.target.value);
  };

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
              onChange={(e) => {onListNameChange(e); setCheckString(e);}}
              />
            <p></p>
            
            <button
              className="b ph3 pv2 input-reset ba white b--white bg-transparent grow pointer dib"
              onClick={() => {if(!!checkString) onListNameSubmit();}}>
              Save            
            </button>
        </div>
        
      </div>
    </div>
  );
};
 
export default CustomListPopup;