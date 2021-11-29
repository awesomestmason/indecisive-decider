/* WelcomeMessage.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo
- Supporting Authors: Mason Rylander

Description: WelcomeMessage.js handles the display of the welcome message that displays when
the "home" route is taken, and it shows the user's name in there. 

*/
import React from 'react';
import './WelcomeMessage.css';

/* 
WelcomeMessage:

Takes in a "username" which is passed in from "user" located in App.js
    

Params: username (string),
Returns: A div tag with text that displays the welcome text of the page.
*/
const WelcomeMessage = ({username}) => {
    return (
        <div className='glow'>
            <div className='white f1'>
                {'Welcome to the Indecisive Decider ' + username + '!'}
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

export default WelcomeMessage ; 