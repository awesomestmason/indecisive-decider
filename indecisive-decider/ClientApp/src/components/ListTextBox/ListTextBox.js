/* ListTextBox.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: ListTextBox.js is responsible for handling all user list inputs and
    is where the "Save List" and "Submit" buttons are located. This is also where
    the checkbox for toggling animations is located. 

*/

import React from 'react';
import './ListTextBox.css';
import {
    FormGroup,
    FormControlLabel,
    Checkbox
  } from '@mui/material';


/* 
ListTextBox: 

Keeps track of user input inside of the text area and includes buttons to implement saving and 
  submitting lists for use in random decision making.

Params: animCheckBox (bool), onInputChange (function), onButtonSubmit (function), onButtonSave(function)
Returns: A div containing a text area, 2 buttons for submiting and saving lists user lists, and a
checkbox for toggling animations.
*/

const ListTextBox = ( {animCheckBox, onInputChange, onButtonSubmit, onButtonSave} ) => {
    return (
        <div>
            <div className=" ">
                <div className='center'>
                    <div className='center form pa4 br3 shadow-5 d-flex flex-column '>
                        <textarea 
                        className="form-control b pa2 input-reset ba white w-100" 
                        style={{resize: 'vertical', backgroundColor: 'rgba(0,0,0,0.93)'}} onChange={onInputChange} rows="5" id="userList" ></textarea>
                        <div>
                            <p></p>
                                <button 
                                className='b ph3 pv2 input-reset ba b--black bg-blue white grow pointer dib'
                                style={{userSelect: 'none'}}
                                onClick={onButtonSubmit} 
                                >
                                Submit
                                </button>
                            <p></p>

                             <button 
                                className='b ph3 pv2 input-reset ba b--black white grow pointer dib'
                                style={{userSelect: 'none', backgroundColor: 'rgb(11, 158, 43)'}}
                                onClick={onButtonSave}
                             >
                                Save List
                            </button>

                        </div>
                        
                        <div className="center">
                            <FormGroup style={{userSelect: 'none'}}>
                                <FormControlLabel
                                    value="start" 
                                    control={<Checkbox defaultChecked color="primary" onClick={animCheckBox}/>} 
                                    label="Toggle Animations" 
                                    size="medium"
                                    />
                            </FormGroup>
                        </div>
                        
                        
                    
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ListTextBox; 