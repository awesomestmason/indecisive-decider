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
import EditListPopup from './components/EditListPopUp/EditListPopUp';

import {fetchPresets, 
        fetchPresetsDefaults, 
        addCustomList, 
        deleteCustomList,
        editCustomList,
      } from './ApiCalls';
      
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
      editID: 0,
      editInput: '',
      customList: '',
      result: '',
      route: 'signIn',
      animationOn: true, //this is for checkbox
      isAnim: false,
      isSignedIn: false,
      isSave: false,
      isEdit: false,
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
        email: data.email,
        name: data.username
      }});
    console.log(this.state.user);
  }

  //Get default presets from database
  componentDidMount() {
    fetchPresetsDefaults()
      .then(users => this.setState({ presets: users}));
  }

  refreshPreset() {
    fetchPresets()
        .then(users => this.setState({ presets: users}));
  }
  
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }

  onListNameChange = (event) => {
    //console.log(event.target.value);
    this.setState({nameInput: event.target.value});
    
  }

  onListNameSubmit = async() => {
    await addCustomList(this.state.nameInput, createList(this.state.customList));
    this.saveToggle();
    this.refreshPreset();
  }

  onEditChange = (event) =>{
    this.setState({editInput: event.target.value});
  }

  onEditSubmit = async (id, name) => {
    await editCustomList(id, name, createList(this.state.editInput));
    this.editToggle();
    this.refreshPreset();
  }

  onButtonSave = () => {
    this.saveToggle();
    this.setState({customList: this.state.input});
  }

  onButtonEdit = (id, name, list) => {
    this.editToggle();

    let stringList = "";
    for(let i = 0; i < list.length; i++)
    {
      if(i === list.length - 1){
        stringList += list[i].value;
      } 
      else {
        stringList += list[i].value + ", ";
      }
    }
    
    this.setState({editInput: stringList});
    this.setState({editID: id});
    this.setState({editName: name});
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

  editToggle = ()  => {
    this.setState({isEdit: !this.state.isEdit});
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
  
  //Deleting Preset Funtion
  delPreset = async(id) => {
    await deleteCustomList(id);
    this.refreshPreset();
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
      this.refreshPreset();
    }

    this.setState({route: route});    
    //console.log("After OnRouteChange "+ this.state.route);
  }


  getComponent(){
    const {
      route, 
      presets, 
      isSave, isEdit, 
      result, 
      editInput, editID, editName
    } = this.state;
    
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
                <Rank username={this.state.user.name}/>
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

                <PresetCardList 
                  presets={presets} 
                  rngPreset={this.rngPreset} 
                  delPreset={this.delPreset}
                  onButtonEdit={this.onButtonEdit}
                  />
                  
                {isEdit &&
                  <EditListPopup 
                    onEditChange={this.onEditChange}
                    onEditSubmit={this.onEditSubmit}
                    editInput={editInput}
                    editID={editID}
                    editName={editName}
                    handleClose={this.editToggle}
                  />
                }
                
                {isSave && 
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
        return <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
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
