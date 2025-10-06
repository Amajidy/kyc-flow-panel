export interface Report {
  completedAt: Date;
  createdAt: Date;
  firstName: string;
  lastName: string;
  currentStep: string;
  failedReason: string | null;
  isCompleted: boolean;
  trackingCode: string;
}
