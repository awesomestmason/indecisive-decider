import React from 'react';
import './PresetCard.css';
import { useState } from 'react';


const PresetCard = ({name, items, rngPreset, rngNumber, id, delPreset, onButtonEdit, isDefault}) => {
    const [min, setMin] = useState();
    const [max, setMax] = useState();

   //console.log("Testing the preset card states ",min,max);

    const onInputMin = async(event) => {
        setMin(event.target.value);
    }

    const onInputMax = (event) => {
        setMax(event.target.value);
    }

    function generateNum(id) {
        console.log("Max: " , max);
        console.log("Min: ", min);
        rngNumber(id, min, max);
    }
    
    return (
        <div className='card tc dib br3 pa3 ma2 grow bw2 shadow-5 pointer'>
            { !(isDefault && name === "Numbers") ?
            <div>
                <h2 className='glow white ' onClick={() => rngPreset(id, items)}>{name}</h2>
                <p></p>    
            </div> :
            <div>
                 <div>
                    <h2 className='glow white ' onClick={() => generateNum(id)}>
                        {name}
                    </h2>
                </div>
                <div>
                    <label 
                        className="db fw6 lh-copy f5 glow white m2"
                    >
                        Min:
                        <input type='number' onChange={onInputMin}/>
                    </label>
                    
                    <label 
                        className="db fw6 lh-copy f5 glow white m2" 
                    >
                        Max:
                        <input type='number' onChange={onInputMax}/>
                    </label>                      
                </div>
            </div> 
            }
          
            { !isDefault &&
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
    );
}

export default PresetCard;