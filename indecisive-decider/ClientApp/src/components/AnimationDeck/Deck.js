// Built off of code from :https://codesandbox.io/embed/j0y0vpz59
// Also :https://medium.com/swlh/tinder-card-swipe-feature-using-react-spring-and-react-use-gesture-7236d7abf2db
// Flipping Card Help From: https://codesandbox.io/s/spring-flip-card-g30zr?file=/src/App.tsx

import React, { useState } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
//import './Deck.css';

import Card from "./Card";
//import "./Deck.css";

const cards = 6;

// used to randomize which sides cards flow in from 
//on animation start up
function randomSide( max, min ) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) > 0 ? 1000 : -1000;
}

//This is the interpolation method to change the stuff
//These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: -100 + i * 3 * 20,
  y: i * -15,
  // y: i * -4,
  scale: 1,
  // rot: -10 + Math.random() * 20,
  rot: -50 + i * 15,
  delay: i * 100
});

const from = i => ({x: randomSide(5,-5), rot: 0, scale: 1.5, y: 0 });

//const [flipped, set] = useState(false)

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const Deck = (props) => {
  let result = props.result;

  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out

  let [properties, api] = useSprings(cards, i => ({ // Create a bunch of springs using the helpers above
    ...to(i),
    from: from(i)
  }));

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) // We want to make them fly. We're only interested in changing spring-data for the current spring
      {
        console.log("Checking out index ", index);
        console.log("Checking out i ", i);
        gone.add(i);
        // const direc = randomSide(2,-2) < 0 ? -1 : 1
        // const vel = randomSide(20,-20) / 100;
        const y =  (200 - window.innerHeight) ; 
        // const rot = mx / 100 + (direc * 10 * vel)
        // const scale = 1;
        //return;
        return {
           y,
        //   rot,
        //   scale,
        //   delay: undefined,
        };
      }
      //const isGone = gone.has(index)
      const x = down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100; // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: 800},
      }
    })});

  // Passing in props to card
  return properties.map(({ x, y, rot, scale }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      bind={bind}
      result={result}
    />
  ));
}

export default Deck;