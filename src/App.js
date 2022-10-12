import { useState, useEffect } from "react";

import {
  MainContainer,
  BorisWalking,
  Background,
  ModalTitle,
  ModalBodyContainer,
  ModalBodyDescription,
  HighlightSpan,
} from "./style";

import Lottie from "lottie-react";

import { useAnimation } from "framer-motion";

import { city1, city2, city3 } from "./lottie-json";

import { Modal } from "hoondesign";

import { useInView } from "react-intersection-observer";

function App() {
  const [startTrigger, setStartTrigger] = useState(false);
  const [onDrag, setOnDrag] = useState(false);
  const [click, setClick] = useState(false);
  const [backgroundArray, setBackgroundArray] = useState([city1, city2, city3]);
  const [borisRef, inView] = useInView();
  const [isOver, setIsOver] = useState(false);

  const [count, setCount] = useState(3);
  const [seconds, setSeconds] = useState(0);

  const changeBackgroundArray = () => {
    const tmp = backgroundArray[0];
    setBackgroundArray(backgroundArray.splice(0, 1));
    setBackgroundArray([...backgroundArray, tmp]);
  };
  const borisWalkingAnimation = useAnimation();

  const borisAnimationSequence = async () => {
    if (startTrigger) {
      await borisWalkingAnimation.start({
        x: "3000px",
        transition: { duration: 6 },
      });
    }
  };
  useEffect(() => {
    if (!onDrag && startTrigger) {
      borisAnimationSequence();
    }
  }, [click, onDrag, startTrigger]);

  useEffect(() => {
    setTimeout(() => {
      setStartTrigger(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    if (count === 0) {
      document?.getElementById("hoondesign-modal").click();
      if (seconds === 0) {
        const startTime = new Date().getTime();
        setSeconds(startTime);
      }
    }
  }, [count]);

  useEffect(() => {
    if (borisRef !== null && !inView && startTrigger) {
      setIsOver(true);
    }
  }, [inView]);
  useEffect(() => {
    document?.getElementById("hoondesign-modal").click();
  }, []);
  useEffect(() => {
    if (isOver) {
      const endTime = new Date().getTime();
      const diffSeconds = Math.floor(((endTime - seconds) / 1000) % 60);
      console.log("YOUR RECORD : ", diffSeconds + " seconds");
    }
  }, [isOver]);

  useEffect(() => {
    console.log(`
    +-+-+-+-+  
    |M|A|K|E|  
    +-+-+-+-+-+
    |B|O|R|I|S|
    +-+-+-+-+-+
    |L|A|T|E|  
    +-+-+-+-+                  
`);
  }, []);

  return (
    <MainContainer id="main-container">
      <Background>
        <Lottie
          animationData={backgroundArray[0]}
          loop={false}
          onComplete={changeBackgroundArray}
        />
      </Background>
      <BorisWalking
        ref={borisRef}
        src={onDrag ? "/boris-running.gif" : "/boris-walking.gif"}
        drag="x"
        position="absolute"
        onDragStart={() => {
          setOnDrag(true);
        }}
        onDragEnd={() => {
          setOnDrag(false);
        }}
        onClick={(e) => {
          setClick(!click);
        }}
        animate={borisWalkingAnimation}
      />
      <Modal
        id="hoondesign-modal"
        modalCloseButton={false}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <ModalBodyContainer>
          <ModalTitle>MAKE BORIS LATE!</ModalTitle>
          <BorisWalking
            src={onDrag ? "/boris-running.gif" : "/boris-walking.gif"}
          />
          <ModalBodyDescription>
            Boris is on his way to work. <br />
            We need to stop Boris from going to work. <br />
            Maybe Boris doesn't want to go to work either.
            <br />
            Drag him back to his original position.
            <br />
            {count !== 0 ? (
              <HighlightSpan>Started in {count} seconds</HighlightSpan>
            ) : (
              <HighlightSpan>Make Boris late!</HighlightSpan>
            )}
          </ModalBodyDescription>
        </ModalBodyContainer>
      </Modal>
    </MainContainer>
  );
}

export default App;
