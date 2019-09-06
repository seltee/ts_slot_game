import styled, { ThemeProvider } from "styled-components";

interface IBodyReal {
  margin: number;
}

const Body = styled.div`
  margin-left: 255px;
  margin-top: 352px;
  height: 212px;
  width: 505px;
  overflow: hidden;
`;

const ReelList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BodyReel = styled.div.attrs((p: IBodyReal) => ({
  style: { transform: `translate(0, ${p.margin}px)` }
}))<IBodyReal>`
  width: 141px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 80px;
`;

export { Body, ReelList, BodyReel, Image };
