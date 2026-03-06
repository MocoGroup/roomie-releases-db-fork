export interface ContractRequest {
  chatId: number;
  startDate: string;
  endDate: string;
  price: number;
}

export interface ContractResponse {
  id: number;
  propertyId: number;
  propertyTitle: string;
  studentId: number;
  studentName: string;
  ownerId: number;
  ownerName: string;
  startDate: string;
  endDate: string;
  price: number;
  status: 'PENDING' | 'ACTIVE' | 'FINISHED' | 'CANCELLED';
}
