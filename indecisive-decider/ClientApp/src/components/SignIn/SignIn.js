import React from 'react';
import { fetchLogin } from '../../ApiCalls'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };

    onSubmitSignIn = () => {
        //console.log(this.state);
        fetchLogin(this.state.signInEmail, this.state.signInPassword)
        .then(data => {
            this.props.onRouteChange('home');
        })
        .catch(error => {
            alert("bad login credentials");
        })
    };
    
    render(){
        const {onRouteChange} = this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{backgroundColor: 'rgba(128, 128, 255, 0.05)'}} >
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0"> Sign In </legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input                        
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" name="email-address"  
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
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer" > Register </p>
                        </div>

                        <div className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib">
                            <p onClick={() => onRouteChange('home')} className="f5 link dim black db pointer" > Continue As Guest </p>
                        </div>

                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn ; 