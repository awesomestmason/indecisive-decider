/* App.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo
- Supporting Authors: Mason Rylander, Richard Choe, Qiance Yu

Description: App.js is the file where all the components in the react app
  come together. This file acts as the main hub where all components made are
  rendered into the app. 

Acknowledgments: 
We reused some code from a prior project to get started on the React app, 
  which consisted of: SignIn, Register, tsParticle usage and the page routing logic.  

*/

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import WelcomeMessage from './components/WelcomeMessage/WelcomeMessage';
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
        resetToken,
        setToken
      } from './ApiCalls';
      
import { createList, returnRandomItem, getPreset, getRandomNum } from './rng';

import FriendList from './components/Friends/FriendList';
import { hasSavedUser, getSavedUser, deleteUser } from './util/localStorageUtil';

//This constant is used for the particle ambience graphics...
//This code was inspired/based on https://particles.js.org/ 
//  and their preset codes for the particleOptions.

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

/*
Class Component: App
-----------------------
We created a React Class Component, which enables us to use each component like a class in Java/C++.
We made many functions that relate to the page routing and/or the passing of state variable getters and setters.
*/
class App extends Component {
  constructor(){
    super();
    this.state = {
      presets: [],        // list for presets
      textboxInput: '',          // used for saving the textbox input.
      nameInput: '',      // used for saving custom list name
      editID: 0,          // used to determine which preset is edited
      editInput: '',      // used to save edit input
      customList: '',     // used to save custom lists from textboxInput
      result: '',         // used for saving result
      presetId: 0,        // presetId
      route: 'signIn',    // used for routing pages
      animationOn: true,  // this is for animation checkbox
      isAnim: false,      // animation popup bool
      isSignedIn: false,  // sign in state bool [used on Navigation]
      isSave: false,      // saving popup bool
      isEdit: false,      // editing popup bool
      user: {             // users data
        id: '',
        name: '',
        email: '',
        password: '',
        avatarUrl: '',
      }
    }
  }

  /*
    loadUser:
      Loads in user data into the state
      Params: response from server containing user data
    Returns: N/A
  */
  loadUser = async(data) => {
    //console.log("Load User data ", data);
    await this.setState({user: {
        id: data.id,
        email: data.email,
        name: data.username,
        avatarUrl: data.avatarUrl,
      }});
    //console.log(this.state.user);
  }
  
  /*
    signInFromLocal:
      If the user has never logged in using their current browser, it sets the localStorage of the browser
      to be the user's info and user's JWT Token for log in. Else, it does nothing.    
    Params: N/A
    Returns: N/A
  */
  signInFromLocal = () => {
    if(this.state.isSignedIn){
      return;
    }
    if(!hasSavedUser()){
        return;
    }
    var loginResponse = getSavedUser();
    setToken(loginResponse.jwtToken);
    this.loadUser(loginResponse.user);
    //console.log(loginResponse);
    this.onRouteChange("home");
  }
  
  /*
    componentDidMount:
      Fetch default presets on succesful page start up.
    Params: N/A
    Returns: N/A
  */
  componentDidMount() {
    fetchPresetsDefaults()
      .then(users => this.setState({ presets: users}));
    this.signInFromLocal();
  }

  /*
    refreshPreset:
      Makes another fetch call to preset, loads most current preset list
        from the database. Intended to be called after adding/deleting presets.
    Params: N/A
    Returns: N/A
  */
  refreshPreset() {
    fetchPresets()
        .then(users => this.setState({ presets: users}));
  }
  
  /*
    onInputChange:
      Changes the "textboxInput" state to be whatever was just typed in ListTextBox's textarea. 
    Params: the website DOM's event object, which contains the string inside the ListTextBox's textarea. 
    Returns: N/A
  */
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({textboxInput: event.target.value});
    //console.log(event.target.value);
  }

  /*
    onListNameChange:
      Changes the "nameInput" state to be whatever was just typed in CustomListPopUp's input area for a name. 
    Params: the website DOM's event object, which contains the string inside CustomListPopUp's input area for a name. 
    Returns: N/A
  */
  onListNameChange = (event) => {
    //console.log(event.target.value);
    this.setState({nameInput: event.target.value});
    
  }

  /*
    onListNameSubmit:
      Makes an api call to the backend to add a custom list based off of
        the current state of "customList". "addCustomList" is the api call
        and "createlist" parses "customList" into an array the api call can use.
        "customList" is a string. Toggles the CustomListPopup component off.
    Params: N/A
    Returns: N/A
  */
  onListNameSubmit = async() => {
    await addCustomList(this.state.nameInput, createList(this.state.customList));
    this.saveToggle();
    this.refreshPreset();
  }

  /*
    onEditChange:
      Changes the "editInput" state to be whatever was just typed in EditListPopUp's textarea. 
    Params: the website DOM's event object, which contains the string inside EditListPopUp's textarea. 
    Returns: N/A
  */
  onEditChange = (event) =>{
    this.setState({editInput: event.target.value});
  }

  /*
    OnEditSubmit:
    Makes an api call to the backend to edit a custom list based off of
      the current state of "editInput". "editCustomList" is the api call
      and "createlist" parses "editInput" into an array the api call can use.
      "editInput" is a string.
    Params: id of preset(int), name of preset(string)
    Returns: N/A
  */
  onEditSubmit = async (id, name) => {
    await editCustomList(id, name, createList(this.state.editInput));
    this.editToggle();
    this.refreshPreset();
  }

  /*
    OnButtonSave:
     Toggles the CustomListPopup component on. Then sets 
      "customList" to the current state of "textboxInput"
    Params: N/A
    Returns: N/A
  */
  onButtonSave = () => {
    this.saveToggle();
    this.setState({customList: this.state.textboxInput});
  }

  /*
    OnButtonEdit:
      Toggles the EditListPopUp component to appear, then converts the array given to a string with the
        format of a list. Then sets the states of "editInput", "editID", and "editName" to that of the 
        params, which then shows on the EditListPopUp component.    
    Params: int "id", string "name", array "list"
    Returns: N/A
  */
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

  /*
    onButtonSubmit:
    Makes an api call to the backend to add a custom list based off of
      the current state of "customList". "addCustomList" is the api call
      and "createlist" parses "customList" into an array the api call can use.
      "customList" is a string.
    Params: N/A
    Returns: N/A
  */
  //Use asynce if lines of code are superceding each other
  onButtonSubmit = async() =>{
    //console.log('click');
    this.setState({customList: this.state.textboxInput});
    //RNG code here:
      // create list
      // get random list item
      
    let result = await returnRandomItem(createList(this.state.textboxInput));
    //  console.log("This is before result ",result);
    this.setState({result: result, canShare: false});
    //  console.log("This is after result ",result);
    
    if(this.state.animationOn){
      this.animToggle();
    }

      //console.log(this.state.result);
      //console.log("actual result from let", result);
  }

  /*
    editToggle:
     Toggles "isEdit" true/false. Used to toggle the
      EditListPopUp component.
    Params: N/A
    Returns: N/A
  */
  editToggle = ()  => {
    this.setState({isEdit: !this.state.isEdit});
  }

  /*
    saveToggle:
     Toggles "isSave" true/false. Used to toggle the
      CustomListPopup component.
    Params: N/A
    Returns: N/A
  */
  saveToggle = ()  => {
    this.setState({isSave: !this.state.isSave});
  }

  /*
    animToggle:
     Toggles "isAnim" true/false. Used to toggle the
      AnimationPopUp component. To be used in conjucntion
      with animCheckBox to determine if animations should
      be played.
    Params: N/A
    Returns: N/A
  */
  animToggle = ()  => {
    this.setState({isAnim: !this.state.isAnim});
  }

  /*
    animCheckBox:
     Sets the state of "animationOn" to be the opposite of what it was before, aka a toggle.
     Used by the checkbox inside of ListTextBox. 
    Params: N/A
    Returns: N/A
  */
  animCheckBox = () => {
      this.setState({animationOn: !this.state.animationOn})
  }
  
  /*
    delPreset:
     Deletes a user preset from the database.
    Params: id of preset(int)
    Returns: N/A
  */
  delPreset = async(id) => {
    await deleteCustomList(id);
    this.refreshPreset();
  }

  /*
    rngPreset:
      Enables the AnimationPopUp to display the results if the checkbox for animations
      Sets the state "result" to be what getPreset() returns, the state "presetID" to be 
      the param 'id', and the state "canShare" to true.
    Params: id of preset(int), items of preset(array)
    Returns: N/A
  */
  rngPreset = (id, items) => {
    if(this.state.animationOn){
      this.animToggle();
    }
    this.setState({result: getPreset(items), presetId: id, canShare: true});
  }

  /*
    rngNumber:
     Generates a random number based in the range(inclusive) of min and max.
     Also toggles the AnimationPopup component. Handling for a special preset card case.
    Params: id of preset(int), min(int), max(int)
    Returns: N/A
  */
  rngNumber = (id,min,max) => {
    //console.log("This the the min and max: ", min, " ",max);
    //console.log("BRO HERE IT IS");
    if(this.state.animationOn){
      //console.log("BRO HERE's THE TOGGLE");
      this.animToggle();
    }
    this.setState({result: ""+ getRandomNum(min,max), presetId: id, canShare: true});
    //console.log("getRandomNum is: ", getRandomNum(min,max));
  }


  /*
    onRouteChange:
      This function sets the state "route" to whatever the string parameter is.
      If the given string param is called 'signOut', removes browser's localStorage for user and tokens.
      If the given string param is called 'home', it sets the state "isSignedIn" to true and also calls 
      refreshPreset() to update the preset list of the user. 
    Params: "route" which is a string.
    Returns: N/A
  */
  onRouteChange = (route) => {
    //console.log("before OnRouteChange "+ this.state.route);
    
    if(route === 'signOut'){
      this.setState({isSignedIn:false});
      this.setState({user: {
        id: '',
        name: '',
        email: '',
        password: '',
      }});
      resetToken();
      deleteUser();
    }   
    
    else if(route === 'home'){
      this.setState({isSignedIn: true});
      this.refreshPreset();
    }

    this.setState({route: route});    
    //console.log("After OnRouteChange "+ this.state.route);
  }

  /*
    getComponent:
     Determines which component is rendered based off the state of "route" 
      and various conditionals for components like pop ups. 
      "route" has 5 pages it can route to depending on its state: register, settings, friends, home, and signIn.
      
     Each page has specific components to render. Home page contians popup components that
      render using booleans in the state.

    Params: N/A
    Returns: a component or a div with components inside.
  */
  getComponent(){
    const {
      route, 
      presets, 
      isSave, isEdit, 
      result,
      presetId,
      canShare,
      editInput, editID, editName
    } = this.state;
    
    switch(route){
      // Register Page
      case 'register': 
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>;
      
      // Settings Page
      case 'settings': 
        return <SettingsView />;

      // Friends Page
      case 'friends': 
        return <FriendList />;

      /* Home Page
        Logo component handles profile picture on home page
        Rank component displays the welcome message
        ResultBox component displays results if a decison is made.
        ListTextBox component displays the textbox for submitting custom lists
        PresetCardList component handles displaying presets cards
        EditListPopup  component handles displaying the editing list popup
        CustomListPopup component handles displaying the saving custom lists popup
        AnimationPopup component displaying animations.
      */
      case 'home': 
        return <div>
                <Logo avatarUrl={this.state.user.avatarUrl}/> 
                <WelcomeMessage username={this.state.user.name}/> 
                { result !== "" &&
                  <ResultBox key={"keyorsoemthing"} result={result} presetId={presetId} canShare={canShare}/>
                }
                
                <ListTextBox
                  animCheckBox={this.animCheckBox}
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                  onButtonSave={this.onButtonSave}
                  // isSave={isSave}
                  // isAnimationOn={this.state.animationOn}
                  />

                <PresetCardList 
                  presets={presets} 
                  rngPreset={this.rngPreset} 
                  rngNumber={this.rngNumber} 
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

  /*
    render:
      This function is required for every Class Component in React.
      It uses JSX, which is basically HTMl in JavaScript, to display elements into the website.
      In this specific render for App.js, we call the Particle Class Component for the tsParticle,
      then add the Navigation Class Component that shows the navbar according to the "signIn" state.
      Then calls getComponent() to get the page we are in right now according to the "route" state.
    Params: N/A
    Returns: N/A
  */
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
