//Built off of code from :https://codesandbox.io/embed/j0y0vpz59
//Also :https://medium.com/swlh/tinder-card-swipe-feature-using-react-spring-and-react-use-gesture-7236d7abf2db

import React, { useState } from "react";
import { useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
//import './Deck.css';

import Card from "./Card";
//import "./Deck.css";

const cards = [
    'https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg',
    'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg'
  ]

const cardBack = 'https://i.imgur.com/olzEJf9.png'

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

// original card stack
// const to = i => ({
//   x: 0,
//   y: i * -4,
//   scale: 1,
//   rot: -10 + Math.random() * 30,
//   delay: i * 100
// });

const from = i => ({x: randomSide(5,-5), rot: 0, scale: 1.5, y: 0 });

const to_back = i => ( {x: randomSide(5,-5), rot: 0, scale: 1.5, y: 0 });

const from_back = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 30,
  delay: i * 1000
});

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out

  let [props, api] = useSprings(cards.length, i => ({ // Create a bunch of springs using the helpers above
    ...to(i),
    from: from(i)
  }));

  // [props, api] = useSprings(cards.length-1, i => ({ // Create a bunch of springs using the helpers above
  //   ...to_back(i),
  //   from: from_back(i)
  // }));

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
    })
    // if (!down && gone.size === cards.length-1)
    //   console.log("we have the whole deck other than the card in my hadn in gone");
    //    setTimeout(() => {
    //      gone.clear()
    //      }, 600)
     }
     );

  // // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  // const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
  //   const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
  //   const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
  //   if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
  //   api.start(i => {
  //     if (index !== i) return // We're only interested in changing spring-data for the current spring
  //     const isGone = gone.has(index)
  //     const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
  //     const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
  //     const scale = down ? 1.1 : 1 // Active cards lift up a bit
  //     return {
  //       x,
  //       rot,
  //       scale,
  //       delay: undefined,
  //       config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
  //     }
  //   })
  //   if (!down && gone.size === cards.length)
  //     setTimeout(() => {
  //       gone.clear()
  //       api.start(i => to(i))
  //       }, 600)
  //   }
  //   );

  // Passing in props to card
  return props.map(({ x, y, rot, scale }, i) => (
    <Card
      i={i}
      x={x}
      y={y}
      rot={rot}
      scale={scale}
      trans={trans}
      cards={cards}
      cardBack={cardBack}
      bind={bind}
    />
  ));
}

export default Deck;