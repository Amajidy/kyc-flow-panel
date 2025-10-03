import {Component, EventEmitter, input, Input, model, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  type = input<string>('text');
  inputMode = input<string | null>(null);
  value = model<string>('');

}
