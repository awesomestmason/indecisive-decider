import React from 'react';
import './ListTextBox.css';
import { green } from '@mui/material/colors';
import {
    FormGroup,
    FormControlLabel,
    Checkbox
  } from '@material-ui/core';
import { fontFamily } from '@mui/system';

//<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
const ListTextBox = ( {animCheckBox, onInputChange, onButtonSubmit, onButtonSave, isSave, isAnimationOn} ) => {
    return (
        <div>
            <div className=" ">
                <div className='center'>
                    <div className='center form pa4 br3 shadow-5 d-flex flex-column '>
                        {/* <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/> */}
                        <textarea className="form-control" style={{resize: 'vertical'}} onChange={onInputChange} rows="5" id="userList" ></textarea>
                        <div>
                            <p></p>
                                <button 
                                className='w-30 grow f4 link ph3 pv2 dib white bg-red pointer'
                                style={{userSelect: 'none'}}
                                onClick={onButtonSubmit} 
                                >
                                Submit
                                </button>
                            <p></p>

                             <button 
                                className='w-30 grow f4 link ph3 pv2 dib white bg-blue pointer'
                                style={{userSelect: 'none'}}
                                onClick={onButtonSave}
                             >
                                Save List
                            </button>

                        </div>
                        
                        <div className="center">
                            <FormGroup style={{userSelect: 'none'}}>
                                <FormControlLabel
                                    value="start" 
                                    control={<Checkbox defaultChecked color="red" onClick={animCheckBox}/>} 
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