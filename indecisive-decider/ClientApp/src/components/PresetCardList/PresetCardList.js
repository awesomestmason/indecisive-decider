import React from 'react';
import PresetCard from './PresetCard';

const PresetCardList = ({presets, rngPreset}) => {
    return [
      <div className='ph7 pv2 ma4'
      style={
        {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gridTemplateRows: '2fr', 
          
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