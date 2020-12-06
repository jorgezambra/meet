import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  }

  hideDetails = () => {
    if (!this.state.showDetails) {
      this.setState({
        showDetails: true,
      })
    }
    else {
      this.setState({
        showDetails: false,
      })
    }
  }

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;

    if (!showDetails) {
      return (<div className="event">
        <p className="summary">{event.summary}</p>
        {/* <p className="description">{event.description}</p> */}
        <p className="start-time">{event.start.dateTime}</p>
        <p className="location">{event.location}</p>
        <button className="hide-details" onClick={() => this.hideDetails()}>
          Show Details
        </button>
      </div>
      )
    }
    else {
      return (
        <div className="event">
          <p className="summary">{event.summary}</p>
          <p className="description">{event.description}</p>
          <p className="start-time">{event.start.dateTime}</p>
          <p className="location">{event.location}</p>
          <a href={event.htmlLink} className="event-detail-link" target="_blank" rel="noreferrer">
            See event on Google Calendar <br></br>
          </a>

          <button className="hide-details" onClick={() => this.hideDetails()}>
            Hide Details
          </button>
        </div>
      )
    }

  }
}
export default Event;