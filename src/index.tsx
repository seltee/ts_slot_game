import React from "react";
import ReactDOM from "react-dom";
import Game from "components/game/index";
import GlobalStyle from "globalStyle";

ReactDOM.render(
  <>
    <Game />
    <GlobalStyle />
  </>,
  document.getElementById("app")
);
