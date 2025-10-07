import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../environment/environment";
import {ApiResponse, Login, LoginResponse, Register} from "../entities/auth";
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);

  isOTPNeeded = signal(false);
  isLoginLoading = signal(false);

  get token(): string | undefined {
    return localStorage.getItem("token") ?? undefined;
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  async registerAction(registerForm: Register) {
    return await firstValueFrom(this._http.post(baseUrl + 'auth/company/register', registerForm));
  }

  register(registerForm: Register) {
    this.registerAction(registerForm).then(res => {
      this._router.navigate(['/auth/login']);
    });
  }

  async loginAction(phone: Login['mobileNumber']) {
    return await firstValueFrom(this._http.post(baseUrl + 'auth/company/otp/request', {
      mobileNumber: phone
    }));
  }

  login(phone: Login['mobileNumber']) {
    this.isLoginLoading.set(true);
    this.loginAction(phone).then(res => {
      this.isOTPNeeded.set(true);
    }).finally(() => {
      this.isLoginLoading.set(false);
    });
  }

  async loginWithOTPAction(login: Login) {
    return await firstValueFrom(this._http.post<ApiResponse<string>>(baseUrl + 'auth/company/otp/verify', login))
  }
  loginWithOTP(login: Login) {
    this.isLoginLoading.set(true)
    this.loginWithOTPAction(login).then(res => {
      this.setToken(res.result);
      this._router.navigate(['/reports']);
    }).finally(() => {
      this.isLoginLoading.set(true);
    })
  }

  logout() {
    this._router.navigate(['/auth']);
    localStorage.removeItem("token");
  }
}
