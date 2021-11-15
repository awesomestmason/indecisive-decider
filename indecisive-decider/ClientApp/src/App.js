import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import SettingsView from './components/UserSettings/Settings';
import './App.css';
import SignIn from './components/SignIn/SignIn';
import CustomListPopup from './components/CustomListPopup/CustomListPopup'
import Register from './components/Register/Register';
import ListTextBox from './components/ListTextBox/ListTextBox';
import PresetCardList from './components/PresetCardList/PresetCardList';
import ResultBox from './components/ResultBox/ResultBox';
import AnimationPopup from './components/AnimationPopUp/AnimationPopup';
import {fetchPresets, fetchPresetsDefaults, addCustomList} from './ApiCalls';
import { createList, returnRandomItem, getRandomNum, getPreset } from './rng';

import FriendList from './components/Friends/FriendList';

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
      nameInput: '',
      customList: '',
      result: '',
      route: 'signIn',
      animationOn: true, //this is for checkbox
      isAnim: false,
      isSignedIn: false,
      isSave: false,
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
    fetchPresetsDefaults()
      .then(users => this.setState({ presets: users}));
  }
  
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }

  onListNameChange = (event) => {
    console.log(event.target.value);
    this.setState({nameInput: event.target.value});
    
  }

  onListNameSubmit = async() => {
    //let list = createList(this.state.customList);
    //console.log(list);
    //console.log("Name of List:", this.state.nameInput);
    await addCustomList(this.state.nameInput, createList(this.state.customList));
    this.saveToggle();
    fetchPresets()
        .then(users => this.setState({ presets: users}));
  }

  onButtonSave = () => {
    this.saveToggle();
    this.setState({customList: this.state.input});
  }

  //Use asynce if lines of code are superceding each other
  onButtonSubmit = async() =>{
    //console.log('click');
    this.setState({customList: this.state.input});
    //RNG code here:
      // create list
      // get random list item
      let result = await returnRandomItem(createList(this.state.input));
      //  console.log("This is before result ",result);
      this.setState({result: result});
      //  console.log("This is after result ",result);
      
      
      
      if(this.state.animationOn){
        this.animToggle();
      }

      //console.log(this.state.result);
      //console.log("actual result from let", result);
  }

  saveToggle = ()  => {
    this.setState({isSave: !this.state.isSave});
  }

  animToggle = ()  => {
    this.setState({isAnim: !this.state.isAnim});
  }

  animCheckBox = () => {
      this.setState({animationOn: !this.state.animationOn})
  }
  

  rngPreset= (items) => {
    if(this.state.animationOn){
      this.animToggle();
    }
    this.setState({result: getPreset(items)});
  }

  onRouteChange = (route) => {
    //console.log("before OnRouteChange "+ this.state.route);
    
    if(route === 'signOut'){
      this.setState({isSignedIn:false})
    } 
    
    else if(route === 'home'){
      this.setState({isSignedIn: true});
      fetchPresets()
        .then(users => this.setState({ presets: users}));
    }

    this.setState({route: route});    
    //console.log("After OnRouteChange "+ this.state.route);
  }


  getComponent(){
    const {route, presets, isSave, result} = this.state;
    switch(route){
      case 'register': 
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
        
      case 'settings': 
        return <SettingsView />;

      case 'friends': 
        // return <div> Friends To be Implemented</div>;
        return <FriendList />;

      case 'home': 
        return <div>
                <Logo />
                <Rank />
                { result !== "" &&
                  <ResultBox result={result}/>
                }
                <ListTextBox
                  animCheckBox={this.animCheckBox}
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                  onButtonSave={this.onButtonSave}
                  isSave={isSave}
                  isAnimationOn={this.state.animationOn}
                  />

                <PresetCardList presets={presets} rngPreset={this.rngPreset}/>
                
                {this.state.isSave && 
                  <CustomListPopup
                  handleClose={this.saveToggle}
                  onListNameChange={this.onListNameChange}
                  onListNameSubmit={this.onListNameSubmit} />
                }

                {result !== '' && this.state.animationOn && this.state.isAnim &&
                  <AnimationPopup 
                    result={result}
                    handleClose={this.animToggle}
                  />
                }
                
                
              </div>;

      // .. etc
      default: 
        return <SignIn onRouteChange={this.onRouteChange}/>
    }
  }

  render(){
    const {isSignedIn, route} = this.state;
    return (
      <div className="App" style={{}}>
        <Particles className='particles'
          options={particleOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route}/>
        {this.getComponent()}
      </div>
    );
  }
}

export default App;
