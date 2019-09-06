import React from "react";
import { Body } from "./style";

interface IProps {}

export default (props: IProps) => <Body>
  <p>3 CHERRY symbols on top line 2000</p>
  <p>3 CHERRY symbols on center line 1000</p>
  <p>3 CHERRY symbols on bottom line 4000</p>
  <p>3 7 symbols on any line 150</p>
  <p>Any combination of CHERRY and 7 on any line 75</p>
  <p>3 3xBAR symbols on any line 50</p>
  <p>3 2xBAR symbols on any line 20</p>
  <p>3 BAR symbols on any line 10</p>
  <p>Combination of any BAR symbols on any line 5</p>
</Body>;