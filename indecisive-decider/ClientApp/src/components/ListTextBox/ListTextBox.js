import React from 'react';
import './ListTextBox.css';
import {
    FormGroup,
    FormControlLabel,
    Checkbox
  } from '@mui/material';

//<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
const ListTextBox = ( {animCheckBox, onInputChange, onButtonSubmit, onButtonSave, isSave, isAnimationOn} ) => {
    return (
        <div>
            <div className=" ">
                <div className='center'>
                    <div className='center form pa4 br3 shadow-5 d-flex flex-column '>
                        {/* <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/> */}
                        <textarea 
                        className="form-control b pa2 input-reset ba bg-black white w-100" 
                        style={{resize: 'vertical'}} onChange={onInputChange} rows="5" id="userList" ></textarea>
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