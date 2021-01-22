import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from  '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, test => {

  test('Additional event details are collapsed by default', ({ given, when, then }) => {
        let AppWrapper;
        let EventWrapper;

      given('the list of events is loaded', () => {
        AppWrapper = mount(<App />);
      expect(AppWrapper.find('EventList')).toHaveLength(1);
      });

      when('the user does not click on the event\'s additional info', () => {

      });

      then('the additional info will not be visible.', () => {
        EventWrapper = mount(<Event event={mockData[0]} />);
        expect(EventWrapper.state('showDetails')).toEqual(false);
      });
    });
    
  test('User can expand a specific event\'s details', ({ given, when, then }) => {
        let AppWrapper;
        let EventWrapper;

      given('the list of events is loaded', () => {
        AppWrapper = mount(<App />);
        expect(AppWrapper.find('EventList')).toHaveLength(1);
      });

      when('the user clicks on the show details button', () => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
        expect(EventWrapper.state('showDetails')).toEqual(false);
        EventWrapper.find('.hide-details').simulate('click');
      });

      then('the user should be able to see the additional information of the event.', () => {
        expect(EventWrapper.state('showDetails')).toEqual(true);
      });
    });

  test('User can collapse the event\'s details', ({ given, when, then }) => {
    let EventWrapper;

      given('the user has previously clicked on the show details button', () => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
        EventWrapper.find('.hide-details').simulate('click');
        expect(EventWrapper.state('showDetails')).toEqual(true);
      });

      when('the user clicks on the hide details button', () => {
        EventWrapper.find('.hide-details').simulate('click');
      });

      then('the additional event details will collapse and no longer be visible.', () => {
        expect(EventWrapper.state('showDetails')).toEqual(false);
      });
    });
  });
