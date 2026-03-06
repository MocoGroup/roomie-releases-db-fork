export interface EvaluationRequest {
  rating: number;
  comment?: string;
}

export interface EvaluationResponse {
  id: number;
  propertyId: number;
  studentId: number;
  studentName: string;
  rating: number;
  comment?: string;
  timestamp: string;
}

export interface EvaluationSummary {
  averageRating: number;
  totalEvaluations: number;
  evaluations: EvaluationResponse[];
}
