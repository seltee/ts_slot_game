import React from "react";
import { Body, BalanceString, Input, OkButton } from "./style";

interface IState {
  inEdit: boolean;
  editValue: number;
}

interface IProps {
  balance: number;
  onChange(newBalance: number): void;
}

export default class PayTable extends React.PureComponent<IProps, IState> {
  interval: number;
  constructor(props: any) {
    super(props);

    this.state = {
      inEdit: false,
      editValue: 0
    };
  }

  limit(val: number) {
    const result = Math.min(Math.max(val, 1), 5000);
    return result ? result : 1;
  }

  edit = () => {
    const { balance } = this.props;
    this.setState({
      inEdit: true,
      editValue: this.limit(balance)
    });
  };

  set = () => {
    const { onChange } = this.props;
    const { editValue } = this.state;
    this.setState({
      inEdit: false
    });
    onChange(editValue);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editValue: this.limit(parseInt(event.target.value)) });
  };

  render() {
    const { balance } = this.props;
    const { inEdit, editValue } = this.state;

    return (
      <Body>
        {inEdit ? (
          <>
            <Input value={editValue} onChange={this.handleChange} />
            <OkButton onClick={this.set}>Ok</OkButton>
          </>
        ) : (
          <BalanceString onClick={this.edit}>Balance: {balance}$</BalanceString>
        )}
      </Body>
    );
  }
}
