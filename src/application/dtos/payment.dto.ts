export interface PaymentDTO {
  studentUuid: string;
  schoolUuid: string;
  value: number;
  discountApplied: boolean;
  discount: number;
  dayPayment: number;
}
