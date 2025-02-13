import styled, { keyframes } from "styled-components";

const StyledBlocker = styled.div`
  align-items: center;
  background: rgba(75, 75, 75, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 99;
`;

const SpinnerAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  animation-name: ${SpinnerAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  display: inline-block;
  height: 48px;
  position: relative;
  width: 48px;

  &:after,
  &:before {
    background: #ff3d00;
    border-radius: 50%;
    box-sizing: border-box;
    content: "";
    height: 6px;
    left: 0;
    position: absolute;
    top: 0;
    transform: translate(150%, 150%);
    width: 6px;
  }

  &:before {
    bottom: 0;
    left: auto;
    right: 0;
    top: auto;
    transform: translate(-150%, -150%);
  }
`;

const LoadingComponent = () => (
  <StyledBlocker>
    <Spinner />
  </StyledBlocker>
);

export default LoadingComponent;
