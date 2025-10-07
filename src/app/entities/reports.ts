export interface Report {
  completedAt: Date;
  createdAt: Date;
  firstName: string;
  lastName: string;
  nationalCode: string;
  mobileNumber: string;
  currentStep: string;
  failedReason: string | null;
  isCompleted: boolean;
  trackingCode: string;
}


export interface Details {
  details: string,
  videoData: string | null,
  signData: string | null,
  stepName: Step,
  isPassed: boolean
}


export enum Step {
  SHAHKAR= "SHAHKAR",
  VIDEO = "VIDEO",
  SIGN = "SIGN",
}


