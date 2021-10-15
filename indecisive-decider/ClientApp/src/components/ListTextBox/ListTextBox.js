import React from 'react';
import './ListTextBox.css';

//<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
const ListTextBox = ( {onInputChange, onButtonSubmit} ) => {
    return (
        <div>
            <p className='f3'>
                {'Type in your list of decisions or pick one of the presets to get started'}
            </p>
            <div className=" ">
                <div className='center'>
                    <div className='center form pa4 br3 shadow-5 d-flex flex-column '>
                        {/* <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/> */}
                        <textarea className="form-control" style={{resize: 'vertical'}} onChange={onInputChange} rows="5" id="userList" ></textarea>
                        
                        <div>
                            <button 
                            className='w-30 grow f4 link ph3 pv2 dib white bg-light-red pointer' 
                            onClick={onButtonSubmit} 
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ListTextBox; 