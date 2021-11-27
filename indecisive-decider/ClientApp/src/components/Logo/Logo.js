import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
//import gundam from './icons8-mobile-suit-gundam-90.png'
//import gura from './Gura Galaxy Brain.jpg'

const Logo = ({avatarUrl}) => {
    return (
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 200, width: 200 }} >
            <div className="Tilt-inner pa3"> 
                <img style={{paddingTop: '1vh', width: "150px", height: "150px"}} alt='logo' src={`${avatarUrl}`} /> 
            </div>
        </Tilt>
        </div>
    );
}

export default Logo; 