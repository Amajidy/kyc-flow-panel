export interface Report {
  completedAt: Date
  createdAt: Date
  currentStep: string
  failedReason: string | null
  status: string
  trackingCode: string
}
