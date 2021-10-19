import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
//import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
//import FaceRecongnition from './components/FaceRecongnition/FaceRecongnition';
//import Particles from 'react-particles-js';
import Particles from 'react-tsparticles';
/*import Clarifai from 'clarifai';*/
import './App.css';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ListTextBox from './components/ListTextBox/ListTextBox';
import PresetCardList from './components/PresetCardList/PresetCardList';
//import { NavMenu } from './components/NavMenu';
/*const app = new Clarifai.App({
  apiKey: 'a160db1d6c1743aa9d4f94148f5b952f'
 });*/

/*const particleOptions={
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      }

      line_linked: {
        shadow: {
            enable: true,
            color: "#3CA9D1",
            blur: 5
          }
      }
    }
}*/

const particleOptions = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 100,
      enable: true,
      opacity: 0.4,
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
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log)

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ presets: users}));
  }
  
  // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputImage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   console.log(width, height);
  //   return{
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height),
  //   }
  // }

  // displayFaceBox = (box) => {
  //   this.setState({box: box});
  //   console.log(box);
  // }

  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
    //console.log(event.target.value);
  }

  onButtonSubmit = () =>{
    //console.log('click');
    this.setState({customList: this.state.input});
    console.log(this.state.customList);
    /*app.models.predict(
      //"53e1df302c079b3db8a0a36033ed2d15",
      "f76196b43bbd45c99b4f3cd8e8b40a8a", 
      this.state.input
      )
    //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));*/
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
