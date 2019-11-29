import React, { Component } from "react";
import languageContext from "../../context/language";

export default class Home extends Component {
  static contextType = languageContext;
  state = {
    count: 1
  };
  updateState = event =>  {
    this.setState(preState => ({
      count: preState.count + 1
    }));
  };
  render() {
    console.log("Home component this.context ", this.state.count);
    return (
      <div>
        <h2>
          Home {this.context} {this.state.count}
        </h2>

        <a onClick={this.updateState}>click</a>
        <ChildComponent />
      </div>
    );
  }
}

function ChildComponent() {
  console.log("ChildComponent");
  return (
    <div>
      <h1>ChildComponent</h1>
    </div>
  );
}
