import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return <Spinner />;
};

const Spin = keyframes`
 to {
    transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  top: 100px;
  margin: 0 auto;
  z-index: 200;
  ::before,
  ::after {
    content: '';
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: white;
    animation: ${Spin} 0.6s linear infinite;
  }
  ::after {
    animation-delay: 0.2s;
  }
`;

// const ModalBackground = styled.div`
//   display: block;
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background: rgba(0, 0, 0, 0.8);
//   z-index: 99;
// `;

export default LoadingSpinner;
