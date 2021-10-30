import React from 'react';
import './PresetCard.css';
import Tilt from 'react-tilt';



const PresetCard = ({ name, items, rngPreset}) => {
    return [
        <div className='card tc dib br3 pa3 ma2 grow bw2 shadow-5 pointer' onClick={() => rngPreset(items)}>
            {/* <img alt='robots' src={`https://robohash.org/${id}?200x200`} /> */}
            <div>
                <h2 className=' justify-content-center glow white'>{name}</h2>
                {/* <h2 className=' justify-content-center glow white'>{items[0].value}</h2> */}
                <p></p>
            </div>
        </div>
    ];
}

export default PresetCard;