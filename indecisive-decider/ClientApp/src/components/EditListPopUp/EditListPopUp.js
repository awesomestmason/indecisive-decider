// Popup Base and Reference taken from: https://www.cluemediator.com/create-simple-popup-in-reactjs
import React from "react";
import './EditListPopUp.css';

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
            {/* <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="listName" 
              name="listName"
              id="listName"
              value="Hi!"
              onChange={onEditChange}
              /> */}
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