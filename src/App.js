import { useState, useEffect } from "react";

import {
  MainContainer,
  BorisWalking,
  Background,
  ModalTitle,
  ModalBodyContainer,
  ModalBodyDescription,
  HighlightSpan,
  Button,
  Input,
  Congratulation,
  ErrorMessage,
  MainContainerNotDesktop,
} from "./style";

import { useMediaQuery } from "react-responsive";

import Lottie from "lottie-react";

import { useAnimation } from "framer-motion";

import { city1, city2, city3 } from "./lottie-json";

import { Modal } from "hoondesign";

import { useInView } from "react-intersection-observer";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";

import { db } from "./firebase-config";

function App() {
  const borisWalkingAnimation = useAnimation();
  const winnerCollectionRef = collection(db, "user");

  // player's data
  const [newGit, setNewGit] = useState("");
  const [newRecord, setNewRecord] = useState(0);

  // winner's data
  const [winnerUsername, setWinnerUsername] = useState("");
  const [winnerRecord, setWinnerRecord] = useState(0);

  const [isRegister, setIsRegister] = useState(false);
  const [startTrigger, setStartTrigger] = useState(false);
  const [onDrag, setOnDrag] = useState(false);
  const [click, setClick] = useState(false);
  const [backgroundArray, setBackgroundArray] = useState([city1, city2, city3]);
  const [borisRef, inView] = useInView();
  const [isOver, setIsOver] = useState(false);
  const [count, setCount] = useState(3);
  const [startTime, setStartTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  // backgrounds loop
  const changeBackgroundArray = () => {
    const tmp = backgroundArray[0];
    setBackgroundArray(backgroundArray.splice(0, 1));
    setBackgroundArray([...backgroundArray, tmp]);
  };

  // how Boris move
  const borisAnimationSequence = () => {
    if (startTrigger && !isOver) {
      borisWalkingAnimation.start({
        x: "3000px",
        transition: { duration: 6 },
      });
    } else if (startTrigger && isOver) {
      borisWalkingAnimation.start({
        x: "0px",
        transition: { duration: 5 },
      });
    }
  };

  // get user from firebase
  const getUser = async () => {
    const data = await getDocs(winnerCollectionRef);
    data.docs.filter((doc) => {
      if (doc.id === "winner") {
        setWinnerUsername(doc.data().git);
        setWinnerRecord(doc.data().record);
      }
    });
  };

  // set user to firebase
  const createUser = async () => {
    await addDoc(winnerCollectionRef, { git: newGit, record: newRecord });
  };

  // set winner to firebase
  const updateUser = async () => {
    const winnerRef = doc(db, "user", "winner");
    if (newRecord > winnerRecord) {
      await updateDoc(winnerRef, { git: newGit, record: newRecord });
      getUser();
      setIsRegister(true);
    }
    createUser();
  };

  // start boris animation sequence
  useEffect(() => {
    if (!onDrag && startTrigger) {
      borisAnimationSequence();
    }
  }, [click, onDrag, startTrigger, isOver]);

  useEffect(() => {
    if (count > 0 && !isFirst) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    if (count === 0 && !isFirst) {
      document?.getElementById("hoondesign-modal").click();
      if (startTime === 0) {
        const currentTime = new Date().getTime();
        setStartTime(currentTime);
        setStartTrigger(true);
      }
    }
  }, [count, isFirst]);

  useEffect(() => {
    if (borisRef !== null && !inView && startTrigger) {
      setIsOver(true);
      document?.getElementById("hoondesign-modal")?.click();
    }
  }, [inView]);
  useEffect(() => {
    document?.getElementById("hoondesign-modal")?.click();
  }, []);
  useEffect(() => {
    if (isOver) {
      const endTime = new Date().getTime();
      const diffTime = Math.floor(((endTime - startTime) / 1000) % 60);
      setScore(diffTime);
      borisAnimationSequence();
      setStartTrigger(false);
      setStartTime(0);
      setNewRecord(diffTime);
    }
  }, [isOver]);

  useEffect(() => {
    if (isRegister) {
      setCount(3);
      setTimeout(() => {
        setIsOver(false);
        setIsRegister(false);
      }, 3600);
    }
  }, [isRegister]);

  useEffect(() => {
    getUser();
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
  return isPc ? (
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
        onClick={() => {
          setClick(!click);
        }}
        animate={borisWalkingAnimation}
      />
      <Modal
        id="hoondesign-modal"
        modalCloseButton={false}
        preventOverlayClick={true}
      >
        <ModalBodyContainer>
          {isOver ? (
            <ModalTitle>Boris Late {score} seconds!</ModalTitle>
          ) : (
            <ModalTitle>Make Boris Late!</ModalTitle>
          )}
          <BorisWalking
            src={isOver ? "/boris-running.gif" : "/boris-walking.gif"}
          />

          {isOver ? (
            winnerRecord > newRecord ? (
              <ModalBodyDescription>
                Wanna see 1st in the world?
                <br />
                He makes Boris late {winnerRecord} seconds
                <br />
                <a href={`https://github.com/${winnerUsername}`}>
                  {winnerUsername}
                </a>
                <br />
                {count !== 0 ? (
                  <HighlightSpan padding="12px 0 0 0" marginTop="24px">
                    Starts in {count} seconds
                  </HighlightSpan>
                ) : (
                  <Button
                    onClick={() => {
                      setIsRegister(true);
                    }}
                  >
                    play again
                  </Button>
                )}
              </ModalBodyDescription>
            ) : (
              <ModalBodyDescription>
                <Congratulation src="congratulation.gif" />
                New Record!
                <br />
                {newRecord} seconds
                <br />
                {!isRegister ? (
                  <div>
                    <Input
                      type="text"
                      placeholder=" your github ID"
                      onChange={(e) => {
                        setNewGit(e.target.value);
                      }}
                      value={newGit}
                    />
                    <Button
                      onClick={() => {
                        updateUser();
                        setIsRegister(true);
                      }}
                    >
                      submit
                    </Button>
                  </div>
                ) : (
                  <HighlightSpan padding="12px 0 0 0" marginTop="24px">
                    Starts in {count} seconds
                  </HighlightSpan>
                )}
              </ModalBodyDescription>
            )
          ) : (
            <ModalBodyDescription>
              Boris is on his way to work. <br />
              We need to stop Boris from going to work. <br />
              Maybe Boris doesn't want to go to work either.
              <br />
              Drag him back to his original position.
              <br />
              {isFirst ? (
                <Button
                  onClick={() => {
                    setIsFirst(false);
                  }}
                >
                  let's start
                </Button>
              ) : (
                <HighlightSpan padding="12px 0 0 0" marginTop="24px">
                  Starts in {count} seconds
                </HighlightSpan>
              )}
            </ModalBodyDescription>
          )}
        </ModalBodyContainer>
      </Modal>
    </MainContainer>
  ) : (
    <MainContainerNotDesktop>
      <ErrorMessage>Desktop only</ErrorMessage>
    </MainContainerNotDesktop>
  );
}

export default App;
