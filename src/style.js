import styled from "styled-components";
import { motion } from "framer-motion";

export const MainContainer = styled.div`
  width: 200vw;
  height: 100vh;
  overflow: hidden;
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
  font-size: 20px;
  text-align: center;
  word-break: keep-all;
`;

export const HighlightSpan = styled.span`
  color: red;
`;
