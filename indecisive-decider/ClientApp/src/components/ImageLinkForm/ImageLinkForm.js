import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( {onInputChange, onButtonSubmit} ) => {
    return (
        <div>
            <p className='f3'>
                {'Type in your list of decisions or pick one of the presets to get started'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-red pointer' 
                        onClick={onButtonSubmit} 
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm; 