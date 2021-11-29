/* SignIn.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo
- Supporting Authors: Mason Rylander

Description: SignIn.js handles the display of the "sign in" box on the "sign in" page. 
All UI elements and related functionality related to said box are located here.

Acknowledgments: 
We reused some code from a prior project to get started on the React app, 
  which consisted of: SignIn, Register, tsParticle usage and the page routing logic.  

*/

import React from 'react';
import { fetchLogin } from '../../ApiCalls'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: 0,
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    /*
        onEmailChange:
            Saves the current state of the email field to "signInEmail"
            Params: onChange event from the email field.
        Returns: N/A
   */
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    /*
        onPasswordChange:
            Saves the current state of the email field to "signInPassword"
            Params: onChange event from the password field.
        Returns: N/A
   */
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    /*
        onSubmitSignIn:
            Sends the data contained within "signInEmail" and "signInPassword"
                to the backend using the api call "fetchLogin", to login into a user account. 
                Then changes the state of "route" inside of app to "home" if procdure was successful.
            Params: N/A
        Returns: N/A
   */
    onSubmitSignIn = () => {
        //console.log(this.state);
        fetchLogin(this.state.signInEmail, this.state.signInPassword)
        .then(data => {
            //console.log(data);
            this.props.loadUser(data.user);
            this.props.onRouteChange('home');
            
        })
        .catch(error => {
            this.setState({error: 1});
        })
    };


    /*
    render:
      This function is required for every Class Component in React.
      It uses JSX, which is basically HTMl in JavaScript, to display elements into the website.
      In this specific render for Signin.js, we make UI that displays the Sign In Form that will call 
      functions that are passed as props into the onClick/onChange event actions. When they hit the
      input tag with "Submit", it logs the user in said they give the correct account details.
    Params: N/A
    Returns: N/A
    */
    render(){
        const {onRouteChange} = this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(255,255,255,.65)'}} >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0"> Sign In </legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input                        
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange} 
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input                              
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer" > Register </p>
                        </div>
                        {!!this.state.error && <div className="red">
                            <p> Incorrect Login! </p>
                        </div>}

                    </div>
                </main>
            </article>
        );
    }
}
//This exports the Component to be used in other places that require it. 
export default SignIn ; 