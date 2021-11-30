/* ResultBox.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo
- Supporting Authors: Mason Rylander

Description: ResultBox.js handles the display of results inside of a container. This
    box is rendered if there is valid result regardless of whether or not animation
    is toggled on/off. It ensures that users always have a way of seeing there results.

*/

import React from 'react';
import { fetchShareToFeed } from '../../ApiCalls'

class ResultBox extends React.Component {
    //props contains key, result, presedId, and canShare
    constructor(props) {
        super(props);
        this.state = {
            shared: false
        }
    }

    /*
        shareDecision:
            Sends the results to the back-end so it can be fed into the 
            user feed.
        Params: onClick event from the "Share your results button"
        Returns: N/A
    */
    shareDecision = async (event) => {
        this.setState({shared: true});
        const {result, presetId} = this.props;
        await fetchShareToFeed(result, presetId);
    }
    /*
        render:
            This function is required for every Class Component in React.
            It uses JSX, which is basically HTMl in JavaScript, to display elements into the website.

            This render contains elements for displaying the results from App.js
                Also contains a button for sharing results which gets disbabled after
                one use to stop users from sharing the same result more than once.

        Params: N/A
        Returns: A div containing your result and a button to share your results
    */
    render(){
        const {result, canShare} = this.props;
        const {shared} = this.state
        return [
        <div>
            <div className=" ">
                <div 
                    disabled={shared} 
                    className='center b ph3 mb4 mt2 pa4 pv2 br3 input-reset ba b--black bg-transparent dib' 
                    style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}
                }> 
                    <p>{'The result for your list is:'}</p>
                    <p className="b f3">{result}</p>
                    {canShare && 
                        <button 
                            disabled={shared} 
                            onClick={this.shareDecision} 
                            className= {shared 
                                ? 'b ph3 pv2 input-reset ba b--black bg-grey black' 
                                : 'b ph3 pv2 input-reset ba b--black bg-blue white grow pointer dib'
                            }>
                            Share Your Result!
                        </button>}
                </div>
            </div>  
        </div>
        ];
    }
}

export default ResultBox;