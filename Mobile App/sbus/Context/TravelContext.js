/*
  What: This is this context of navigation data
  Who: CHIU LIN FUNG 1155109993
  Where: whole app
  Why: to remain the state of navigation at the same for all components within navigation page
  How: simiply call TravelContext and set value when needed in navigation page
*/


import React from 'react';

export const TravelContext = React.createContext(defaultValue);

let defaultValue = {
  start: "Current location",
  startLocation: null,
  end: "",
  endLocation: null,
  currentRoute : "",
  currentLocation: null,
  state: null,
  updateLocation: (start, end) => {},
  updateState: (state) => {}
};
