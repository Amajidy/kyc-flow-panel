import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {InputComponent} from "../../../componets/input/input.component";
import {ButtonComponent} from "../../../componets/button/button.component";
import {Login} from "../../../entities/auth";
import {OtpInputComponent} from "../../../componets/otp-input/otp-input.component";
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    OtpInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private _authService = inject(AuthService);
  loginForm = signal<Login>({
    mobileNumber: '',
    otpCode: ''
  });

  isLoading = computed(() => this._authService.isLoginLoading())

  otpMustBeShown = computed(() => this._authService.isOTPNeeded())

  login() {
    if (this._authService.isOTPNeeded()){
      this._authService.loginWithOTP(this.loginForm())
    } else {
      this._authService.login(this.loginForm().mobileNumber)
    }
  }

  onComplete(code: string) {
    this.loginForm.update(login => {
      login.otpCode = code
      return login
    })
    this.login();
  }
}
