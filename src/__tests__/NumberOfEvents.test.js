import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render the number of elements div', () => {
    expect(NumberOfEventsWrapper.find('.EventsNumber')).toHaveLength(1);
  });

  test('render textbox element', () => {
    expect(NumberOfEventsWrapper.find('.textbox')).toHaveLength(1);
  });

  test('ensure default number of events is set', () => {
    expect(NumberOfEventsWrapper.state('numberofevents')).toBe(32);
  });

  test('change state when input changes', () => {
    NumberOfEventsWrapper.setState({
      numberofevents: 32
    });

    const eventNumber = { target: { value: 10 } };
    NumberOfEventsWrapper.find('.textbox').simulate('change', eventNumber);
    expect(NumberOfEventsWrapper.state('numberofevents')).toBe(10);
  });

}); 