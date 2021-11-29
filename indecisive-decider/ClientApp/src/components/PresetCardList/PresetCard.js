/* PresetCard.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: PresetCard.js handles the format the preset cards/options look like and how
they interact with the user. 

*/
import React from 'react';
import './PresetCard.css';
import { useState } from 'react';

/* 
PresetCard:

Takes in the props that sent in from PresetCardList.js and uses them to 
determine what actions will be taken per preset.
    -If the preset is a default preset, make a standard card that has an onClick event on the text 
    that displays the result [and animation if enabled] of the preset.
    -If the preset is a default preset but also called Numbers, add two number input boxes that send those
    numbers to states that are used later on generateNum() which calculates the random number asked for.
    -If its neither default or Numbers, then we generate a default card with the ability to edit and delete the list, since 
    these presets are now Custom Presets made by the user. 

Params: name (string), items(array), id(int), delPreset,rngNumber,rngPreset, and onButtonEdit(function), isDefault(boolean)
Returns: A card that has text inside that is clickable, and depending on the type of preset changes what it can do (explanations above).
*/
const PresetCard = ({name, items, rngPreset, rngNumber, id, delPreset, onButtonEdit, isDefault}) => {
    const [min, setMin] = useState();
    const [max, setMax] = useState();

   //console.log("Testing the preset card states ",min,max);
    /*
        onInputMin:
        Changes the "min" state to be whatever was just typed in PresetCard's input area for a min value. 
        Params: the website DOM's event object, which contains the number inside PresetCard's input area for a min value. 
        Returns: N/A
    */
    const onInputMin = async(event) => {
        setMin(event.target.value);
    }

    /*
        onInputMax:
        Changes the "max" state to be whatever was just typed in PresetCard's input area for a max value. 
        Params: the website DOM's event object, which contains the number inside PresetCard's input area for a max value. 
        Returns: N/A
    */
    const onInputMax = (event) => {
        setMax(event.target.value);
    }

    /*
        generateNum:
        Calls the rngNumber() function that was passed from PresetCardList and feeds it the 'id' param and the "min/max" states.
        Params: id, min, max(int)
        Returns: N/A
    */
    function generateNum(id) {
        //console.log("Max: " , max);
        //console.log("Min: ", min);
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