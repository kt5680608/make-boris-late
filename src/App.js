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
} from "./style";

import Lottie from "lottie-react";

import { useAnimation } from "framer-motion";

import { city1, city2, city3 } from "./lottie-json";

import { Modal } from "hoondesign";

import { useInView } from "react-intersection-observer";

import { collection, doc, getDocs, updateDoc } from "@firebase/firestore";

import { db } from "./firebase-config";

function App() {
  const [winner, setWinner] = useState();
  const [newGit, setNewGit] = useState("");
  const [newRecord, setNewRecord] = useState(0);
  const [currentGit, setCurrentGit] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [currentRecord, setCurrentRecord] = useState(0);
  const [isRegister, setIsRegister] = useState(false);
  const winnerCollectionRef = collection(db, "user");
  const [startTrigger, setStartTrigger] = useState(false);
  const [onDrag, setOnDrag] = useState(false);
  const [click, setClick] = useState(false);
  const [backgroundArray, setBackgroundArray] = useState([city1, city2, city3]);
  const [borisRef, inView] = useInView();
  const [isOver, setIsOver] = useState(false);
  const [count, setCount] = useState(3);
  const [startTime, setstartTime] = useState(0);
  const borisWalkingAnimation = useAnimation();
  const [score, setScore] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [placeholder, setPlaceHolder] = useState("github url");

  const changeBackgroundArray = () => {
    const tmp = backgroundArray[0];
    setBackgroundArray(backgroundArray.splice(0, 1));
    setBackgroundArray([...backgroundArray, tmp]);
  };

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

  const getUser = async () => {
    const data = await getDocs(winnerCollectionRef);

    setWinner(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const updateUser = async () => {
    const winnerRef = doc(db, "user", "winner");

    const isGit = newGit?.split("/");
    console.log(isGit[2]);
    if (newRecord > currentRecord && isGit[2] === "github.com") {
      console.log("here");
      await updateDoc(winnerRef, { git: newGit, record: newRecord });
      getUser();
      setIsRegister(true);
    } else if (newRecord > currentRecord && !isGit[2] === "github.com") {
      setPlaceHolder("not github url");
      setNewGit("");
    }
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
        setstartTime(currentTime);
        setStartTrigger(true);
      }
    }
  }, [count, isFirst]);

  useEffect(() => {
    if (borisRef !== null && !inView && startTrigger) {
      setIsOver(true);
      document?.getElementById("hoondesign-modal").click();
    }
  }, [inView]);
  useEffect(() => {
    document?.getElementById("hoondesign-modal").click();
  }, []);
  useEffect(() => {
    if (isOver) {
      const endTime = new Date().getTime();
      const diffTime = Math.floor(((endTime - startTime) / 1000) % 60);
      setScore(diffTime);
      borisAnimationSequence();
      setStartTrigger(false);
      setstartTime(0);
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
    setCurrentRecord(
      winner?.map((item) => {
        return item.record;
      })
    );
    setCurrentGit(
      winner?.map((item) => {
        return item.git;
      })
    );
    setCurrentUser(
      winner?.map((item) => {
        const user = item.git.split("/");

        return user[3];
      })
    );
  }, [winner]);

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
            currentRecord > newRecord ? (
              <ModalBodyDescription>
                Wanna see 1st in the world?
                <br />
                He makes Boris late {currentRecord} seconds
                <br />
                <a href={currentGit}>{currentUser}</a>
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
                New Record!
                <br />
                {newRecord} seconds
                <br />
                {!isRegister ? (
                  <>
                    <Input
                      type="text"
                      placeholder={placeholder}
                      onChange={(e) => {
                        setNewGit(e.target.value);
                      }}
                      value={newGit}
                    />
                    <Button
                      onClick={() => {
                        updateUser();
                      }}
                    >
                      submit
                    </Button>
                  </>
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
  );
}

export default App;
