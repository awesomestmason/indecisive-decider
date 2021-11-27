import React from 'react';
import './PresetCard.css';
import Tilt from 'react-tilt';
import { getRandomNum } from '../../rng';
import { useState } from 'react';


const PresetCard = ({ name, items, rngPreset, id, delPreset, onButtonEdit}) => {
    const [input1, setInput1] = useState([]);
    const [input2, setInput2] = useState([]);
    
    const onInputChange1 = (event) => {
        setInput1(event.target.value);
    }

    const onInputChange2 = (event) => {
        setInput2(event.target.value);
    }


    return [
        <div className='card tc dib br3 pa3 ma2 grow bw2 shadow-5 pointer'>
            { id !== 0 ?
            <div>
                <h2 className='glow white ' onClick={() => rngPreset(items)}>{name}</h2>
                <p></p>    
            </div> :
            <div>
                 <div>
                    <h2 className='glow white ' onClick={() => {
                        rngPreset(items)
                    }}>{name}</h2>
                </div>
                <div>
                    <label className="db fw6 lh-copy f6" for="email-address">
                        Max
                        <input type='number'/>
                    </label>
                    
                    <label className="db fw6 lh-copy f6" for="email-address">
                        Min
                        <input type='number'/>
                    </label>                      
                </div>
            </div> 
            }
          
            { id > 3 &&
                <div>
                    <button 
                        className='b ph3 pv2 input-reset ba b--black bg-blue white grow pointer dib mh2' 
                        type='button'
                        onClick={() => onButtonEdit(id, name, items)}
                    >
                        Edit
                    </button>
                    <button 
                    className='b ph3 pv2 input-reset ba b--black white grow pointer dib mh2' 
                    style={{backgroundColor: 'rgba(200, 0, 0, 1)'}}
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