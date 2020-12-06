import React, { Component } from "react";

class NumberOfEvents extends Component {

  state = {
    numberofevents: 32,
  }

  changeEventNumber = (event) => {
    this.setState({
      numberofevents: event.target.value
    })
  }

  render() {
    return (
      <div className="EventsNumber">
        <input type="text" className="textbox"
          value={this.state.numberofevents}
          onChange={this.changeEventNumber}
        ></input>
      </div>
    )
  }

}

export default NumberOfEvents; 