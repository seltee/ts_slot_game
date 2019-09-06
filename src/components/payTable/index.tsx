import React from "react";
import { Body, Message } from "./style";

export enum PayTableStatus {
  New,
  InSpin,
  Won,
  Lost,
  NoMoney
}

interface IState {
  isShown: boolean;
}

interface IProps {
  status: PayTableStatus;
  won: number;
  blink: boolean;
}

export default class PayTable extends React.PureComponent<IProps, IState> {
  interval: number;
  constructor(props: any) {
    super(props);

    this.state = {
      isShown: false
    };

    this.interval = setInterval(() => {
      this.setState({ isShown: !this.state.isShown });
    }, 400);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatusLine(status: PayTableStatus) {
    switch (status) {
      case PayTableStatus.New:
        return "Try youself, spin the reels!";
      case PayTableStatus.Lost:
        return "Don't worry, you will win next time!";
      case PayTableStatus.InSpin:
        return "Spining ...";
      case PayTableStatus.Won:
        return `Wow! You have won ${this.props.won}$!`;
      case PayTableStatus.NoMoney:
        return "No money - no honey";
    }
  }

  render() {
    const { status, blink } = this.props;
    const { isShown } = this.state;

    return <Body>{!blink || isShown ? <Message>{this.getStatusLine(status)}</Message> : null}</Body>;
  }
}
