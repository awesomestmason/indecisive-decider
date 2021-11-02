import React from 'react';
import PresetCard from './PresetCard';
//ph7 pv2 ma4
const PresetCardList = ({presets, rngPreset}) => {
    return [
      <div className='dflex pv2 ma4'
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
              //id={presets[i].id} 
              name={presets[i].name}
              items={presets[i].items}
              rngPreset = {rngPreset}
            />];
             })}
      </div>
    ];
}

export default PresetCardList;