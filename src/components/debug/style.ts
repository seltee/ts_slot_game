import styled from "styled-components";

interface IBody{
  enabled: boolean;
}

const Body = styled.div`
  height: 60px;
  line-height: 60px;
  display: flex;
  flex-direction: row;
  align-items: start;
  opacity: ${(p: IBody) => p.enabled ? '1' : '0.4'}
  pointer-events: ${(p: IBody) => p.enabled ? 'all' : 'none'}
`;

const ModeString = styled.div`
  font-size: 21px;
  cursor: pointer;
  color: #c2272d;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 15px 10px 0px 10px;
`;

const Select = styled.select`
  padding: 4px;
  font-size: 21px;
`;

export { Body, ModeString, Column, Select };
