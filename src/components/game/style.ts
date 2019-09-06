import styled from "styled-components";

interface IBolt{
  marginTop: number
}

const Body = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  min-width: 100%;
`;

const GameBody = styled.div`
  padding: 40px 40px;
  margin: auto;
  position: relative;
`;

const Slot = styled.div`
  width: 1020px;
  height: 715px;
  background-image: url("/images/slot.jpg");
  display: inline-block;
  position: relative;
`;

const SpinButton = styled.div`
  width: 110px;
  height: 250px;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 170px;
`;

const Bolt = styled.div`
  width: 100px;
  height: 495px;
  background-image: url("/images/bolt.gif");
  mix-blend-mode: color-dodge;
  background-size: contain;
  position: absolute;
  transform: rotate(90deg);
  top: 135px;
  left: 458px;
  margin-top: ${(p: IBolt) => `${p.marginTop}px`};
`;

export { Body, GameBody, Slot, SpinButton, Bolt };
