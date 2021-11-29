/* Register.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo
- Supporting Authors: Mason Rylander

Description: Register.js handles the display of the "Register" box on the "Register" page. 
All UI elements and related functionality related to said box are located here.

Acknowledgments: 
We reused some code from a prior project to get started on the React app, 
  which consisted of: SignIn, Register, tsParticle usage and the page routing logic.  

*/

import React from 'react';
import { fetchRegister } from '../../ApiCalls'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            Name: '',
            ErrorMessage: []
        }
    }
    
    /*
        onNameChange:
            Saves the current state of the name field to "Name"
            Params: onChange event from the name field.
        Returns: N/A
   */
    onNameChange = (event) => {
        this.setState({Name: event.target.value})
    };

    /*
        onEmailChange:
            Saves the current state of the email field to "Email"
            Params: onChange event from the email field.
        Returns: N/A
   */
    onEmailChange = (event) => {
        this.setState({Email: event.target.value})
    };

    /*
        onPasswordChange:
            Saves the current state of the email field to "Password"
            Params: onChange event from the password field.
        Returns: N/A
   */
    onPasswordChange = (event) => {
        this.setState({Password: event.target.value})
    };

    /*
        onSubmitRegister:
            Sends the data contained within "Name", "Email", and "Password"
                to the backend using the api call "fetchRegister", which creates a new account. 
                Then changes the state of "route" inside of app to "signIn" if procdure was
                successful.
            Params: N/A
        Returns: N/A
   */
    onSubmitRegister = () => {
        fetchRegister(this.state.Name, this.state.Email, this.state.Password)
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('signIn');
            }
        }).catch(error => {
            console.log(error.message);
            this.setState({ErrorMessage: JSON.parse(error.message) });
        })
    };

    /*
    render:
      This function is required for every Class Component in React.
      It uses JSX, which is basically HTMl in JavaScript, to display elements into the website.
      In this specific render for Register.js, we make UI that displays the Register Form that will call 
      functions that are passed as props into the onClick/onChange event actions. When they fill in all the 
      input forms that are required to make an account, they can press the "Submit" button. This will sent them back
      to the Sign In page and then the user is created. 
    Params: N/A
    Returns: N/A
    */
    render(){
        //const {onRouteChange} = this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(255,255,255,.65)'}}>
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0"> Register </legend>
                        
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}
                                />
                        </div>

                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                                />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
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
                                onClick={this.onSubmitRegister} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib" 
                                type="submit" 
                                value="Submit" 
                            />
                        </div>

                        <div>
                            <p></p>
                        </div>
                        <div className="red">
                            {this.state.ErrorMessage.map(msg => <p>{msg}</p>)}
                        </div>
                    </div>
                    

                </main>
            </article>
        );
    }
}

export default Register; 