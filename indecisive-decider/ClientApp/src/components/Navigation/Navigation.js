/* Navigation.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: Navigation.js handles the display of the nav bar for navigating pages.
    Depending on the state of "route" which is passed in from App.js, Navigation.js
    will return a set of buttons linked to different pages.

Acknowledgments: 
We reused some code from a prior project to get started on the React app, 
  which consisted of: SignIn, Register, tsParticle usage and the page routing logic.  

*/


import React from 'react';


/* 
Navigation:

Takes in a string from App.js called "route" which determines what the Navigation bar will
    display. For each option displayed the funtion "onRouteChange" is used to change the 
    state of "route" inside of App.js. The bool "isSignedIn" is used to confirm if a user
    has signed in. 

Params: route (string), onRouteChange(function), isSignedIn(boolean)
Returns: A nav tag with clickable text which allows users to change pages
*/
const Navigation = ({route, onRouteChange, isSignedIn}) => {

    if(isSignedIn){
        
        if(route === 'settings'){
            
            return(
            
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('home')}  className='f3 link dim white underline pa3 pointers'>Home</p>
                <p onClick={() => onRouteChange('friends')}  className='f3 link dim white underline pa3 pointers'>Friends</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim white underline pa3 pointers'>Sign Out</p>
            </nav>
        );}
        
        else if(route === 'friends'){
            
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('home')}  className='f3 link dim white underline pa3 pointers'>Home</p>
                <p onClick={() => onRouteChange('settings')}  className='f3 link dim white underline pa3 pointers'>Settings</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim white underline pa3 pointers'>Sign Out</p>
            </nav>
        );}

        else{
            
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('friends')}  className='f3 link dim white underline pa3 pointers'>Friends</p>
                <p onClick={() => onRouteChange('settings')}  className='f3 link dim white underline pa3 pointers'>Settings</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim white underline pa3 pointers'>Sign Out</p>
            </nav>
        );}
        
    } 
    
    //If the user is not logged in, this will show as the navigation bar.
    else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signIn')}  className='f3 link dim white underline pa3 pointers'>Sign In</p>
            <p onClick={() => onRouteChange('register')}  className='f3 link dim white underline pa3 pointers'>Register</p>
            </nav>
        );
    }
}
//<p onClick={ () => onRouteChange('signIn')}  className='f3 link dim black underline pa3 pointers'>Sign Out</p>
export default Navigation; 