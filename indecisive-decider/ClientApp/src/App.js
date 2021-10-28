import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ListTextBox from './components/ListTextBox/ListTextBox';
import PresetCardList from './components/PresetCardList/PresetCardList';
import {fetchPresets} from './ApiCalls';

//This constant is used for the particle ambience graphics...
const particleOptions = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 100,
      enable: true,
      opacity: 0.3,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area: 400,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      onclick: {
        enable: false,
        mode: "push"
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 800,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
}

//Remember that when sending to RNG decider, to send that preset's item list for it to work
class App extends Component {
  constructor(){
    super();
    this.state = {
      presets: [],
      input: '',
      customList: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        hash: '',
        password: '',
        entries: 0,
        joined: new Date()
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        hash: data.hash,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }})
  }

  componentDidMount() {

  fetchPresets()
    .then(users => this.setState({ presets: users}));
  }
  
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    //console.log('click');
    this.setState({customList: this.state.input});
    console.log(this.state.customList);
  }

  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState({isSignedIn:false})
    } 
    
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }
  
  render(){
    const {isSignedIn, route, presets} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          options={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ListTextBox
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              />
            <PresetCardList presets={presets}/>
          </div> 
        
        : ( route === 'register'
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <SignIn onRouteChange={this.onRouteChange}/>

          ) 
        }
      </div>
    );
  }
}

export default App;
