/* Card.js
- Main Authors: Nathan Lin, Angel Martinez-Portillo

Description: Card.js handles the generation of each card inside of the card deck.
backgrounds for the cards are handled within Card.css. The flipping animation for each
individual card is also hanlded here.


Acknowledgments: 
  Built off of code from :https://codesandbox.io/embed/j0y0vpz59
  Also :https://medium.com/swlh/tinder-card-swipe-feature-using-react-spring-and-react-use-gesture-7236d7abf2db
  Flipping Card Help From: https://codesandbox.io/s/spring-flip-card-g30zr?file=/src/App.tsx
*/

import React, {useState} from "react";
import { useSpring ,animated , to as interpolate} from "react-spring";
import './Deck.css'
import './Card.css'
import audioFlip from "../../sounds/cardflip.wav";

const Card = ({ i, x, y, rot, scale, trans, bind, result}) => {
  
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1250px) rotateX(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  

  return (
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once.
    <animated.div 
      onClick={() => set((state) => !state)}
      className="deck "
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
    
      {/* 
        When card is on it's back display the back card image 
        When a flip occurs opacity of card goes to 0 while the front opcaity goes from 0 to 1 
        in order to help simulate a flip
      */}
      <animated.div 
      className="back"
        {...bind(i)}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform: interpolate([rot, scale], trans),
        }}
      >
      <div className="center" style={{width:"31vh", height:'50vh'}}>
        </div>
      </animated.div>
      
      <animated.div 
      className="front"
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          opacity,
          transform,
          rotateX: "-180deg",
        }}
      >
        
      {/* 
        When card is flipped play audio 
        When card is on it's back display the front card image 
        When a flip occurs opacity of card goes to 0 while the back opcaity goes from 0 to 1 
        in order to help simulate a flip

        Results only displayed on the front of the card.
      */}
      { flipped && <audio src={audioFlip} autoPlay/>}
      <div className="white center  flex-column" style={{width:"30vh", height:'50vh'}}>
          <p>
            The Result is:
          </p>
          <h2>
            {result}
          </h2>
        </div>
      </animated.div>


    </animated.div>
  );
};

export default Card;