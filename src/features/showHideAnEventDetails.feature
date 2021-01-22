Feature: Show/Hide an events details

  Scenario: Additional event details are collapsed by default
    Given the list of events is loaded
    When the user does not click on the event's additional info
    Then the additional info will not be visible.

  Scenario: User can expand a specific event's details
    Given the list of events is loaded
    When the user clicks on the show details button
    Then the user should be able to see the additional information of the event.

  Scenario: User can collapse the event's details
    Given the user has previously clicked on the show details button
    When the user clicks on the hide details button
    Then the additional event details will collapse and no longer be visible.
