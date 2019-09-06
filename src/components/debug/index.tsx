import React from "react";
import { Body, ModeString, Column, Select } from "./style";
import { IReel } from "interfaces";
import { DebugMode, ReelSlots } from "enums";

interface IState {}

interface IProps {
  mode: DebugMode;
  onChangeMode(mode: DebugMode): void;
  onChangeRow(reel: number, row: number): void;
  onChangeSlot(reel: number, slot: ReelSlots): void;
  reels: Array<IReel>;
  enabled: boolean;
}

export default class Debug extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { mode, onChangeMode, onChangeRow, onChangeSlot, reels, enabled } = this.props;

    return (
      <Body enabled={enabled}>
        <ModeString onClick={() => onChangeMode(mode == DebugMode.off ? DebugMode.on : DebugMode.off)}>
          Debug {mode == DebugMode.on ? "on" : "off"}
        </ModeString>
        {mode == DebugMode.on
          ? reels.map((item, i) => (
              <Column key={i}>
                <Select value={item.targetRow} onChange={event => onChangeRow(i, parseInt(event.target.value))}>
                  <option value={0}>Top row</option>
                  <option value={1}>Middle row</option>
                  <option value={2}>Bottom row</option>
                </Select>
                <Select value={item.targetSlot} onChange={event => onChangeSlot(i, parseInt(event.target.value))}>
                  <option value={ReelSlots.bar1}>Bar</option>
                  <option value={ReelSlots.bar2}>2xBar</option>
                  <option value={ReelSlots.bar3}>3xBar</option>
                  <option value={ReelSlots.seven}>Seven</option>
                  <option value={ReelSlots.cherry}>Cherry</option>
                </Select>
              </Column>
            ))
          : null}
      </Body>
    );
  }
}
