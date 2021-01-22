import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import "./nprogress.css";
import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberofevents: 32,
    currentLocation: 'all',
    alertInfo: '',
  }

  updateEvents = (location, eventCount) => {
    if(!navigator.onLine){
      this.setState({
        alertInfo: 'You are offline, to update data, connect to the internet'
      });
    }
    const { currentLocation, numberofevents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const filterEvents = locationEvents.slice(0, numberofevents);
        this.setState({
          events: filterEvents,
          currentLocation: location,
        });
      });
    }
    else {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === currentLocation);
        const filterEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filterEvents,
          numberofevents: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">
        <h2>Meet App</h2>
        <OfflineAlert text={this.state.alertInfo} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <br></br>
        <NumberOfEvents numberofevents={this.state.numberofevents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
