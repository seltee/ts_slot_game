import React from "react";
import { Body, ReelList } from "./style";
import Real from "./reel";
import { IReel } from "interfaces";

interface IState {}

interface IProps {
  reels: Array<IReel>;
}

export default class Reels extends React.PureComponent<IProps, IState> {
  render() {
    const { reels } = this.props;

    return (
      <Body>
        <ReelList>
          <Real reel={reels[0].slots} reelSpin={reels[0].spin} />
          <Real reel={reels[1].slots} reelSpin={reels[1].spin} />
          <Real reel={reels[2].slots} reelSpin={reels[2].spin} />
        </ReelList>
      </Body>
    );
  }
}
