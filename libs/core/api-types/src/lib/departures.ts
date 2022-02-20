export interface DepartureFlight {
  flightNumber: string;
  passengers: number;
  destination: string;
  departureTime: string;
  takeOffTime?: string;
  gate: string;
}

export interface DepartureFlightUpdate {
  flightNumber: string;
  takeOffTime: string;
}
