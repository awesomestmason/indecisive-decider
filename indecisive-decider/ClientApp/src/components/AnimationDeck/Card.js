import React, {useState} from "react";
import { useSpring ,animated , to as interpolate} from "react-spring";
import './Deck.css'
import './Card.css'
import audioFlip from "../../sounds/cardflip.wav";

const Card = ({ i, x, y, rot, scale, trans, bind, result}) => {
  //const {url} = cards[i];
  const [flipped, set] = useState(false);
  // const transl = (r, s) =>
  // `perspective(1500px) rotateX(30deg) rotateY(0deg) rotateZ(${r}deg) scale(${s})`;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1250px) rotateX(${flipped ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  

  return (
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    <animated.div 
      onClick={() => set((state) => !state)}
      className="deck "
      key={i}
      style={{
        transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`)
      }}
    >
    
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div 
      className="back"
        {...bind(i)}
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform: interpolate([rot, scale], trans),
          //backgroundImage: `url(${cards[i]})`
          //transform,
          //backgroundImage: `url(${cardBack})`
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
          //backgroundImage: `url(${cards[i]})`
          //backgroundImage: `url(${cardBack})`
        }}
      >
        
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