import React from "react";
import { BodyReel, Image } from "./style";
import { ReelSlots } from "enums";

const urls = {
  [ReelSlots.bar1]: "/images/BAR.png",
  [ReelSlots.bar2]: "/images/2xBAR.png",
  [ReelSlots.bar3]: "/images/3xBAR.png",
  [ReelSlots.seven]: "/images/7.png",
  [ReelSlots.cherry]: "/images/Cherry.png"
};

interface IState {}

interface IProps {
  reel: Array<ReelSlots>;
  reelSpin: number;
}

export default class Reel extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { reel, reelSpin } = this.props;

    return (
      <BodyReel margin={reelSpin - 97}>
        {reel.map(element => (
          <Image src={urls[element]} key={element} />
        ))}
      </BodyReel>
    );
  }
}
