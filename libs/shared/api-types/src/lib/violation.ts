export interface ViolationsResponse {
  isValid: boolean;
  violations: Array<Violation>
}

export interface Violation {
  id: string;
  description: string;
}
