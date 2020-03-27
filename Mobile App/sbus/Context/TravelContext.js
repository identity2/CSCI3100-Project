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