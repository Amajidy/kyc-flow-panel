import {Component, computed, inject, OnInit} from '@angular/core';
import {ButtonComponent} from "../../componets/button/button.component";
import {ReportService} from "../../services/reports.service";
import {JalaliDatePipe} from "../../pipes/jalali-date.pipe";
import {StepPipe} from "../../pipes/step.pipe";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    ButtonComponent,
    JalaliDatePipe,
    StepPipe
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  private _reportService = inject(ReportService);
  reports = computed(() => this._reportService._reports())
  ngOnInit() {
    this._reportService.report()
  }
}
