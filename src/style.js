import styled from "styled-components";
import { motion } from "framer-motion";

export const MainContainer = styled.div`
  width: 200vw;
  height: 100vh;
  overflow: hidden;
`;

export const MainContainerNotDesktop = styled(MainContainer)`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

export const BorisWalking = styled(motion.img)`
  width: 240px;
  object-fit: contain;
  cursor: grab;
  position: ${(props) => props.position && props.position};
  bottom: 0%;
`;

export const Background = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const ModalTitle = styled.h1`
  font-family: R-FLEX-BLACK;
  margin-bottom: 24px;
`;

export const ModalBodyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ModalBodyDescription = styled.p`
  margin-top: 24px;
  font-family: R-FLEX-REGULAR;
  font-size: 16px;
  text-align: center;
  line-height: 1.4;
  word-break: keep-all;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const HighlightSpan = styled.span`
  color: red;
  display: inline-block;
  padding: ${(props) => props.padding && props.padding};
  margin-top: ${(props) => props.marginTop && props.marginTop};
`;

export const Button = styled.button`
  margin-top: 24px;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 24px;
  font-family: R-FLEX-REGULAR;
  font-size: 16px;
  text-align: center;
  word-break: keep-all;
  position: relative;
  z-index: 988;
  cursor: pointer;
`;

export const Input = styled.input`
  font-size: 16px;
  padding: 12px;
  border: lightgray 0.5px solid;
  margin-right: 24px;
  border-radius: 24px;
  position: relative;
  z-index: 988;
`;

export const Congratulation = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  top: 80%;
`;

export const ErrorMessage = styled.h2`
  font-family: R-FLEX-BLACK;
  font-size: 48px;
`;
