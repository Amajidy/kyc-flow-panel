import {Component, inject, signal} from '@angular/core';
import {InputComponent} from "../../../componets/input/input.component";
import {ButtonComponent} from "../../../componets/button/button.component";
import {Register} from "../../../entities/auth";
import {AuthService} from "../../../services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private _authService = inject(AuthService);

    registerForm = new FormGroup({
      callbackUrl: new FormControl('', [Validators.required]),
      adminEmail: new FormControl('', [Validators.required]),
      adminMobileNumber: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required])
    });

    register() {
      if (this.registerForm.invalid) return;

      const registerTemp: Register = {
        callbackUrl: this.registerForm.controls.callbackUrl.value ?? '',
        adminEmail: this.registerForm.controls.adminEmail.value ?? '',
        companyName: this.registerForm.controls.companyName.value ?? '',
        adminMobileNumber: this.registerForm.controls.adminMobileNumber.value ?? '',
      }
      this._authService.register(registerTemp)
    }

}
