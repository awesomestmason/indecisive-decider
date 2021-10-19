import React from 'react';
import PresetCard from './PresetCard';

const PresetCardList = ({presets}) => {
    return [
      <div className='ph7 pv2'
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
            id={presets[i].id} 
            name={presets[i].name}
            />];
             })}
      </div>
    ];
}

export default PresetCardList;