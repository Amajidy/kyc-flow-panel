import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ButtonComponent} from "../../componets/button/button.component";
import {ReportService} from "../../services/reports.service";
import {JalaliDatePipe} from "../../pipes/jalali-date.pipe";
import {StepPipe} from "../../pipes/step.pipe";
import {NgClass, NgIf} from "@angular/common";
import {ModalComponent} from "../../componets/modal/modal.component";
import {Report} from "../../entities/reports";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    ButtonComponent,
    JalaliDatePipe,
    StepPipe,
    NgClass,
    ModalComponent,
    NgIf
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  private _reportService = inject(ReportService);
  sanitizer = inject(DomSanitizer);
  isUserMediaModalShown = signal(false)
  detail = computed(() => {
    return this._reportService._detail().map(detail => {
      return {
        ...detail,
        videoData: detail.videoData ? URL.createObjectURL(this._reportService.base64DataToBlob(detail.videoData)!) : null,
        signData: detail.signData ? URL.createObjectURL(this._reportService.base64DataToBlob(detail.signData)!) : null
      }
    })
  })
  detailLoading = computed(() => this._reportService._detailLoading())
  reports = computed(() => this._reportService._reports())
  ngOnInit() {
    this._reportService.report()
  }

  openMediaModal(report: Report) {
    this._reportService.media(report.trackingCode)
    this.isUserMediaModalShown.set(true)
  }

  returnBLob() {

  }
}
