/* Logo.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: Logo.js handles displaying the profile picture of the user.
    When the user scrolls over the progile picture a tilt effect happens.

*/

import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
//import gundam from './icons8-mobile-suit-gundam-90.png'
//import gura from './Gura Galaxy Brain.jpg'

/* 
Logo:

Takes in a url which is passed in from "user" located in App.js
    in order to display the profile picture. Because of the way the
    profile pictures are handled in the back-end only png images
    can be used.
Params: avatarUrl (string of url to png)
Returns: A Tilt Block with the User's profile image.
*/

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