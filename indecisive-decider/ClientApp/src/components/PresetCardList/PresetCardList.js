import React from 'react';
import PresetCard from './PresetCard';
//ph7 pv2 ma4
const PresetCardList = ({presets, rngPreset, delPreset, onButtonEdit, isEdit}) => {
    return [
      <div className='dflex ma4 center'
      style={
        {
          // display: 'grid',
          // alignContent: 'center',
          // justifyContent: 'center',
          // gridTemplateColumns: 'repeat(3, 1fr)',
          // gridAutoRows: 'minmax(100px, auto)', 
          
        }
      }>
        
        {presets.map((user, i) => {
            return [
            <PresetCard 
              key={i} 
              id={presets[i].id} 
              name={presets[i].name}
              items={presets[i].items}
              rngPreset = {rngPreset}
              delPreset = {delPreset}
              onButtonEdit = {onButtonEdit}
            />];
             })}
      </div>
    ];
}

export default PresetCardList;