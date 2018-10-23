import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

import RaidList from "./RaidList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <RaidList />
      </div>
    );
  }
}

export default App;
