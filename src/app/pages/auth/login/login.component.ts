import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {InputComponent} from "../../../componets/input/input.component";
import {ButtonComponent} from "../../../componets/button/button.component";
import {Login} from "../../../entities/auth";
import {OtpInputComponent} from "../../../componets/otp-input/otp-input.component";
import {AuthService} from "../../../services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    OtpInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private _authService = inject(AuthService);

  loginForm = new FormGroup({
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(/^09\d{9}$/)]),
    otpCode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6)]),
  });

  isLoading = computed(() => this._authService.isLoginLoading())

  otpMustBeShown = computed(() => this._authService.isOTPNeeded())

  login() {
    // if (this.loginForm.invalid) return;
    console.log(this.loginForm)
    const loginTemp: Login = {
      mobileNumber: this.loginForm.controls.mobileNumber.value ?? '',
      otpCode: this.loginForm.controls.otpCode.value ?? ''
    }
    if (this._authService.isOTPNeeded()){
      this._authService.loginWithOTP(loginTemp)
    } else {
      this._authService.login(loginTemp.mobileNumber)
    }
  }

  onComplete(code: string) {
    this.loginForm.patchValue({
      otpCode: code
    });

    this.login();
  }
}
