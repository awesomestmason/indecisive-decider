import React from 'react';
import './PresetCard.css';
import Tilt from 'react-tilt';



const PresetCard = ({ name, items, rngPreset, id, delPreset, onButtonEdit}) => {
    return [
        <div className='card tc dib br3 pa3 ma2 grow bw2 shadow-5 pointer'>
            {/* <img alt='robots' src={`https://robohash.org/${id}?200x200`} /> */}
            <div>
                <h2 className='glow white ' onClick={() => rngPreset(items)}>{name}</h2>
                {/* <h2 className=' justify-content-center glow white'>{items[0].value}</h2> */}
                <p></p>
                
            </div>
            <p></p>
            { id > 3 &&
                <div>
                    <button 
                        className='w-30 grow link ph3 pv2 mh2 dib white bg-gray pointer' 
                        type='button'
                        onClick={() => onButtonEdit(id, name, items)}
                    >
                        Edit
                    </button>
                    <button 
                    className='w-30 grow link ph3 pv2 mh2 dib white bg-gray pointer' 
                    type='button'
                    onClick={() => delPreset(id)}
                    >
                        Remove
                    </button>
                </div>
            }
        </div>

    ];
}

export default PresetCard;