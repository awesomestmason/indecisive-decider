/* PresetCardList.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: PresetCardList.js handles the preset card generation, given data from App.js
in the form of props. 

*/
import React from 'react';
import PresetCard from './PresetCard';
import {firstBy} from "thenby";


/* 
PresetCardList:

Takes in the props that sent in from App.js and uses them to 
  generate the preset cards seen in the webapp. It goes through the "preset" state in App.js
  and creates the cards according to how PresetCard.js deals with them by feeding props to the PresetCard component.
  They are in a list here for convinience
  and order.

Params: presets(array of objects), delPreset,rngNumber,rngPreset, and onButtonEdit(function)
Returns: A div with the preset cards generated from the calls to PresetCard. 
*/
const PresetCardList = ({presets, rngPreset, rngNumber, delPreset, onButtonEdit}) => {
    return [
      <div key={"key"} className='dflex ma4 center'>
        {presets.sort(firstBy(e => !e.isDefault).thenBy(e => e.id)).map((user, i) => {
            return ( 
            <PresetCard
              key={i.toString()}
              id={presets[i].id} 
              name={presets[i].name}
              items={presets[i].items}
              isDefault={presets[i].isDefault}
              rngPreset = {rngPreset}
              rngNumber = {rngNumber}
              delPreset = {delPreset}
              onButtonEdit = {onButtonEdit}
            />)
             })}
      </div>
      ];

}

export default PresetCardList;
