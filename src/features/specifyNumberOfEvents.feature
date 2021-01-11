Feature: Specify Number of Events

  Scenario: When user hasn’t specified a number, 32 is the default number
    Given the events have loaded
    When the user has not specified the amount of events to view
    Then the default amount to view will be 32.

  Scenario: User can change the number of events they want to see
    Given the events have loaded
    When the user specifies the number of events he wishes to see
    Then that number of events will be visible to the user.
