export interface GateChange {
    previousGate: string;
    currentGate: string;
    flightNumber: string;
    direction: 'Arrival' | 'Departure';
}


