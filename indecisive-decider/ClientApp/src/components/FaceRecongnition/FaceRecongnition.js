/*import React from 'react';
//import gura from '../Logo/Gura Galaxy Brain.jpg'
import './FaceRecongnition.css'

const FaceRecongnition = ({imageUrl, box}) => {
    //<img alt='faces' src={gura}  />
    return (
        <div className='center pa3'>
            <div className='absolute mt2 shadow-5'>
                <img id='inputImage' alt='faces' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecongnition; */

import React from 'react';
import './FaceRecongnition.css'

const FaceRecongnition = ({imageUrl, box}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 shadow-5'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol, }}></div>
            </div>
        </div>
    );

}

export default FaceRecongnition;