export interface Login {
  mobileNumber: string,
  otpCode: string
}

export interface Register {
  companyName: string,
  adminEmail: string,
  adminMobileNumber: string,
  callbackUrl: string
}


export interface LoginResponse {
  message: string,
  token: string,
}
