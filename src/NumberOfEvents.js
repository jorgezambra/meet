import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    numberofevents: 32,
    errorNumber: ''
  }

  changeEventNumber = (event) => {
  if(event.target.value <= 32) {
    this.setState({
      numberofevents: event.target.value,
      errorNumber: ''
    });
  } else {
    return this.setState({
        numberofevents: event.target.value,
        errorNumber: 'Number must be between 1 and 32'
      });
    }
    this.props.updateEvents(null, event.target.value);
  };

  render() {
    return (
      <div className="eventsNumber">
        <label htmlFor='numberOfEvent'># of Events: </label>
        <input type="text" className="numberOfEvents"
          value={this.state.numberofevents}
          onChange={this.changeEventNumber}
        ></input>
        <ErrorAlert text={this.state.errorNumber} />
      </div>
    )
  }

}

export default NumberOfEvents;
