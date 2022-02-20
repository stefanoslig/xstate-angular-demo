export interface ArrivalFlight {
    flightNumber: string;
    passengers: number;
    origin: string;
    arrivalTime: string;
    landingTime?: string;
    gate: string;
}

export interface ArrivalFlightUpdate {
    flightNumber: string;
    landingTime: string;
}


