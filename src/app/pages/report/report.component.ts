import { Component } from '@angular/core';
import {ButtonComponent} from "../../componets/button/button.component";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
