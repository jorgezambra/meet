import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    let AppWrapper;

    given('the events have loaded', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1)
    });

    when('the user has not specified the amount of events to view', () => {

    });

    then('the default amount to view will be 32', () => {
      expect(AppWrapper.state('numberofevents')).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    let NumberOfEventsWrapper;

    given('the events have loaded', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
    });

    when('the user specifies the number of events he wishes to see', () => {
      NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
      const eventNum = { target: { value: '15' }};
      NumberOfEventsWrapper.find('.numberOfEvents').simulate('change', eventNum);
    });

    then('that number of events will be visible to the user.', () => {
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(15);
    });
  });
});
