import React from "react";
import { animated, to as interpolate} from "react-spring";
import './Deck.css'

const Card = ({ i, x, y, rot, scale, trans, bind, cards, cardBack }) => {
  //const {url} = cards[i];

  return (
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    <animated.div 
      className="deck "
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
    
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
          //backgroundImage: `url(${cards[i]})`
          backgroundImage: `url(${cardBack})`
        }}
      >
      <div className="" style={{width: '300px', height: '200px'}}>
          
          
        </div>
      </animated.div>
    </animated.div>
  );
};

export default Card;