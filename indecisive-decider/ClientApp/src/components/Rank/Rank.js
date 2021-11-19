import React from 'react';
import './Rank.css';

const Rank = () => {
    return (
        <div className='glow'>
            <div className='white f1'>
                {'Welcome to the Indecisive Decider'}
            </div>
            
            <div className='white f1'>
                {'Having Trouble Making a Choice? Let Us Fix That For You.'}
            </div>

            <div>
            <p className='glow white f4'>
                {'Type in a comma seperated list or pick one of the presets to get started'}
            </p>
            </div>
        </div>
    );
}

export default Rank ; 