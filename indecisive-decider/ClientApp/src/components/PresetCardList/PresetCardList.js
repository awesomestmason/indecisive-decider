import React from 'react';
import PresetCard from './PresetCard';

const PresetCardList = ({presets}) => {
    return [
      <div className=''
      style={
        {
          display: 'grid',
          width: '700px',
         
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridTemplateRows: '2fr', 
          justifyItems: 'stretch',
          
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