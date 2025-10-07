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

export interface ApiResponse<T> {
  errors: string | null,
  message: string,
  result: T
}
