import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import "./nprogress.css";
import { OfflineAlert } from './Alert';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

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
        alertInfo: 'You are offline, to update, connect to the internet'
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

  getData = () => {
  const {locations, events} = this.state;
  const data = locations.map((location)=>{
    const number = events.filter((event) => event.location === location).length
    const city = location.split(' ').shift()
    return {city, number};
  })
  return data;
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
        <h4>Events in each city</h4>
      <div className="data-vis-wrapper">
      <EventGenre events={this.state.events} />
        <ResponsiveContainer height={400} >
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis
                      type="category"
                      dataKey="city"
                      name="city"
                    />
                    <YAxis
                      allowDecimals={false}
                      type="number"
                      dataKey="number"
                      name="number of events"
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter data={this.getData()} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
      </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
