import React, { Component } from "react";

class NumberOfEvents extends Component {

  state = {
    numberofevents: 32,
  }

  changeEventNumber = (event) => {
    this.setState({
      numberofevents: event.target.value
    });
    this.props.updateEvents(null, event.target.value);
  };

  render() {
    return (
      <div className="EventsNumber">
        <label htmlFor='numberOfEvent'># of Events: </label>
        <input type="text" className="textbox"
          value={this.state.numberofevents}
          onChange={this.changeEventNumber}
        ></input>
      </div>
    )
  }

}

export default NumberOfEvents; 