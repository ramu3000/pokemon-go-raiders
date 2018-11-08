import React from "react";
import "./Navigation.css";

class Navigation extends React.Component {
  state = {
    navButtonOpen: false
  };
  componentDidMount() {}

  onNavigationOpen = event => {
    this.setState({ navButtonOpen: !this.state.navButtonOpen });
  };
  render() {
    return (
      <div
        className={
          "navigation-wrapper" + (this.state.navButtonOpen ? " active" : "")
        }
      >
        <div className="navigation-button-raid">
          <span role="img" aria-label="new raid">
            📯
          </span>
        </div>
        <div className="navigation-button">
          <button onClick={this.onNavigationOpen}>
            <span role="img" aria-label="open menu">
              ➕
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Navigation;
