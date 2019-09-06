import styled from "styled-components";

const Body = styled.div`
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const BalanceString = styled.div`
  font-size: 21px;
  cursor: pointer;
  color: #c2272d;
`;

const Input = styled.input`
  padding: 0px 12px;
  height: 24px;
  font-size: 21px;
`;

const OkButton = styled.button`
  height: 28px;
  width: 40px;
  margin-left: 4px;
`;


export { Body, BalanceString, Input, OkButton };
