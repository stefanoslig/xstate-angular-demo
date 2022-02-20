export interface ValidationResponse {
  isValid: boolean;
  validations: Array<Validation>
}

export interface Validation {
  id: string;
  blocking: boolean;
  description: string;
}
