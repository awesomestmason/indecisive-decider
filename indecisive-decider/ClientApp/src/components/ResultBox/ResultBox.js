import React from 'react';
import './ResultBox.css';
import { fetchShareToFeed } from '../../ApiCalls'

//<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
class ResultBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shared: false
        }
    }

    shareDecision = async (event) => {
        this.setState({shared: true});
        const {result, presetId} = this.props;
        await fetchShareToFeed(result, presetId);
    }

    render(){
        const {result, presetId, canShare} = this.props;
        const {shared} = this.state
        return [
        <div>
            <div className=" ">
                <div disabled={shared} className='center b ph3 mb4 mt2 pa4 pv2 br3 input-reset ba b--black bg-transparent dib' style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}> 
                    <p>{'The result for your list is:'}</p>
                    <p className="b f3">{result}</p>
                    {canShare && <button disabled={shared} onClick={this.shareDecision} className={shared ? 'b ph3 pv2 input-reset ba b--black bg-grey black' : 'b ph3 pv2 input-reset ba b--black bg-blue white grow pointer dib'}>
                        Share Your Result!
                    </button>}
                </div>
            </div>  
        </div>
        ];
    }
}

export default ResultBox;