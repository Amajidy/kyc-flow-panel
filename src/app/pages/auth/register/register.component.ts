import {Component, inject, signal} from '@angular/core';
import {InputComponent} from "../../../componets/input/input.component";
import {ButtonComponent} from "../../../componets/button/button.component";
import {Register} from "../../../entities/auth";
import {AuthService} from "../../../services/auth.service";
import {OtpInputComponent} from "../../../componets/otp-input/otp-input.component";



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    OtpInputComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private _authService = inject(AuthService);

    registerForm = signal<Register>({
        callbackUrl: '',
        adminEmail: '',
        adminMobileNumber: '',
        companyName: ''
    });

    register() {
      this._authService.register(this.registerForm())
    }

}
