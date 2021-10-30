import React from 'react';

const Navigation = ({route, onRouteChange, isSignedIn}) => {

    if(isSignedIn){
        
        if(route === 'settings'){
            
            return(
            
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('home')}  className='f3 link dim black underline pa3 pointers'>Home</p>
                <p onClick={() => onRouteChange('friends')}  className='f3 link dim black underline pa3 pointers'>Friends</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim black underline pa3 pointers'>Sign Out</p>
            </nav>
        );}
        
        else if(route === 'friends'){
            
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('home')}  className='f3 link dim black underline pa3 pointers'>Home</p>
                <p onClick={() => onRouteChange('settings')}  className='f3 link dim black underline pa3 pointers'>Settings</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim black underline pa3 pointers'>Sign Out</p>
            </nav>
        );}

        else{
            
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', position: 'sticky'}}>
                <p onClick={() => onRouteChange('friends')}  className='f3 link dim black underline pa3 pointers'>Friends</p>
                <p onClick={() => onRouteChange('settings')}  className='f3 link dim black underline pa3 pointers'>Settings</p>
                <p onClick={() => onRouteChange('signOut')}  className='f3 link dim black underline pa3 pointers'>Sign Out</p>
            </nav>
        );}
        
    } 
    
    else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signIn')}  className='f3 link dim black underline pa3 pointers'>Sign In</p>
            <p onClick={() => onRouteChange('register')}  className='f3 link dim black underline pa3 pointers'>Register</p>
            </nav>
        );
    }
}
//<p onClick={ () => onRouteChange('signIn')}  className='f3 link dim black underline pa3 pointers'>Sign Out</p>
export default Navigation; 