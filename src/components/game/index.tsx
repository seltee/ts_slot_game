import React from "react";
import { Body, GameBody, Slot, SpinButton, Bolt } from "./style";
import PayTable, { PayTableStatus } from "components/payTable";
import Reels from "components/reels";
import { IReel } from "interfaces";
import Balance from "components/balance";
import Debug from "components/debug";
import { ReelSlots, DebugMode } from "enums";

const reelSlots = [ReelSlots.bar3, ReelSlots.bar1, ReelSlots.bar2, ReelSlots.seven, ReelSlots.cherry];

interface IState {
  reels: Array<IReel>;
  status: PayTableStatus;
  won: number;
  rowWon: number;
  blink: boolean;
  balance: number;
  mode: DebugMode;
}

interface IProps {}

export default class Game extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      reels: [
        { inSpin: false, slots: reelSlots.slice(), targetSlot: 0, targetRow: 0 },
        { inSpin: false, slots: reelSlots.slice(), targetSlot: 0, targetRow: 0 },
        { inSpin: false, slots: reelSlots.slice(), targetSlot: 0, targetRow: 0 }
      ],
      status: PayTableStatus.New,
      won: 0,
      blink: false,
      rowWon: 0,
      balance: 100,
      mode: DebugMode.off
    };

    // main game loop
    // one frame takes 20 ms = 1000 / 50 (50 frames per second)
    setInterval(() => {
      const { reels, mode } = this.state;

      if (this.isInPlay()) {
        const newReals = reels.map(item => {
          if (item.inSpin) {
            const newItem = Object.assign({}, item, {
              spin: item.spin + item.speed,
              slots: item.slots.slice(),
              counter: item.counter - 1,
              speed: item.speed + item.acceleration
            });

            if (item.speed <= 0) {
              newItem.inSpin = false;
              newItem.spin = 0;
            }

            if (newItem.spin >= 80) {
              newItem.spin -= 80;
              const el = newItem.slots.pop();
              newItem.slots.unshift(el);
            }

            if (newItem.counter <= 0 && item.acceleration == 0) {
              if (mode == DebugMode.off) {
                const acceleration = -item.speed / 25 - 0.00001;
                const path = item.speed * 25 + (acceleration * 25 * 25) / 2;
                const newSpin = 80 - (path % 80) - item.speed / 2;

                // 0.5 seconds is 25 frame due to 50 frames is one second
                newItem.acceleration = acceleration;
                newItem.spin = newSpin;
              } else {
                const slotsCount = newItem.slots.length;
                const path = 25 * 25 + (25 * 25) / 2;
                const willStopOn = Math.ceil(path / 80) % slotsCount;
                const newSpin = 80 - (path % 80) - 24.999;

                if (item.slots[(willStopOn + item.targetRow) % slotsCount] == newItem.targetSlot) {
                  newItem.acceleration = -1.000001;
                  newItem.speed = 25;
                  newItem.spin = newSpin;
                }
              }
            }

            return newItem;
          }
          return item;
        });

        this.setState({
          reels: newReals
        });

        if (newReals.every(item => item.inSpin == false)) {
          this.checkIsWin(newReals);
        }
      }
    }, 20);
  }

  isInPlay = () => {
    return this.state.reels.some(item => item.inSpin);
  };

  win = (summ: number, rowWon: number) => {
    const { balance } = this.state;
    this.setState({
      won: summ,
      blink: true,
      status: PayTableStatus.Won,
      rowWon: rowWon,
      balance: balance + summ
    });
  };

  checkIsWin = (reels: Array<IReel>) => {
    const { balance } = this.state;

    const getLine = (num: number) => {
      return [reels[0].slots[0 + num], reels[1].slots[0 + num], reels[2].slots[0 + num]];
    };

    const isFixed = (line: Array<ReelSlots>, slot: ReelSlots) => line.every(item => item == slot);
    const isCherriesAnd7 = (line: Array<ReelSlots>) =>
      line.filter(item => item == ReelSlots.cherry || item == ReelSlots.seven).length == 3;
    const isOnlyBars = (line: Array<ReelSlots>) =>
      line.filter(item => [ReelSlots.bar1, ReelSlots.bar2, ReelSlots.bar3].indexOf(item) != -1).length == 3;

    const lineTop = getLine(1);
    const lineMiddle = getLine(2);
    const lineBottom = getLine(3);

    if (isFixed(lineTop, ReelSlots.cherry)) return this.win(2000, 0);
    if (isFixed(lineMiddle, ReelSlots.cherry)) return this.win(1000, 1);
    if (isFixed(lineBottom, ReelSlots.cherry)) return this.win(4000, 2);
    if (isFixed(lineTop, ReelSlots.seven)) return this.win(150, 0);
    if (isFixed(lineMiddle, ReelSlots.seven)) return this.win(150, 1);
    if (isFixed(lineBottom, ReelSlots.seven)) return this.win(150, 2);
    if (isCherriesAnd7(lineTop)) return this.win(75, 0);
    if (isCherriesAnd7(lineMiddle)) return this.win(75, 1);
    if (isCherriesAnd7(lineBottom)) return this.win(75, 2);
    if (isFixed(lineTop, ReelSlots.bar3)) return this.win(50, 0);
    if (isFixed(lineMiddle, ReelSlots.bar3)) return this.win(50, 1);
    if (isFixed(lineBottom, ReelSlots.bar3)) return this.win(50, 2);
    if (isFixed(lineTop, ReelSlots.bar2)) return this.win(20, 0);
    if (isFixed(lineMiddle, ReelSlots.bar2)) return this.win(20, 1);
    if (isFixed(lineBottom, ReelSlots.bar2)) return this.win(20, 2);
    if (isFixed(lineTop, ReelSlots.bar1)) return this.win(10, 0);
    if (isFixed(lineMiddle, ReelSlots.bar1)) return this.win(10, 1);
    if (isFixed(lineBottom, ReelSlots.bar1)) return this.win(10, 2);
    if (isOnlyBars(lineTop)) return this.win(5, 0);
    if (isOnlyBars(lineMiddle)) return this.win(5, 1);
    if (isOnlyBars(lineBottom)) return this.win(5, 2);

    this.setState({ status: balance > 0 ? PayTableStatus.Lost : PayTableStatus.NoMoney });
  };

  spin = () => {
    const { balance } = this.state;
    if (!this.isInPlay() && balance) {
      this.setState({
        status: PayTableStatus.InSpin,
        balance: balance - 1,
        blink: false,
        reels: this.state.reels.map((item, i) =>
          Object.assign({}, item, {
            inSpin: true,
            speed: 20 + Math.random() * 10,
            counter: 100 + i * 25,
            acceleration: 0,
            spin: 0
          })
        )
      });
    }
  };

  setBalance = (newBalance: number) => {
    this.setState({
      balance: newBalance
    });
  };

  handleMode = (newMode: DebugMode) => {
    this.setState({
      mode: newMode
    });
  };

  handleReelRow = (reel: number, row: number) => {
    this.setState({
      reels: this.state.reels.map((item, i) => {
        if (i == reel) {
          return Object.assign({}, item, { targetRow: row });
        } else {
          return item;
        }
      })
    });
  };

  handleReelSlot = (reel: number, slot: ReelSlots) => {
    this.setState({
      reels: this.state.reels.map((item, i) => {
        if (i == reel) {
          return Object.assign({}, item, { targetSlot: slot });
        } else {
          return item;
        }
      })
    });
  };

  render() {
    const { reels, status, won, blink, rowWon, balance, mode } = this.state;

    return (
      <Body>
        <GameBody>
          <Balance balance={balance} onChange={this.setBalance} />
          <Slot>
            <Reels reels={reels} />
            <SpinButton onClick={this.spin} />
            {status == PayTableStatus.Won ? <Bolt marginTop={80 * rowWon} /> : null}
          </Slot>
          <PayTable status={status} won={won} blink={blink} />
          <Debug
            enabled={!this.isInPlay()}
            mode={mode}
            reels={reels}
            onChangeMode={this.handleMode}
            onChangeRow={this.handleReelRow}
            onChangeSlot={this.handleReelSlot}
          />
        </GameBody>
      </Body>
    );
  }
}
