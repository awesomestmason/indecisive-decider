import React from 'react';
import PresetCard from './PresetCard';
import {firstBy} from "thenby";


//ph7 pv2 ma4
const PresetCardList = ({presets, rngPreset, rngNumber, delPreset, onButtonEdit, isEdit}) => {
    return [
      <div key={"key"} className='dflex ma4 center'
      style={
        {
          // display: 'grid',
          // alignContent: 'center',
          // justifyContent: 'center',
          // gridTemplateColumns: 'repeat(3, 1fr)',
          // gridAutoRows: 'minmax(100px, auto)', 
          
        }
      }>
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
