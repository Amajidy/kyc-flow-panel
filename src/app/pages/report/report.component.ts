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
  detail = computed(() => this._reportService._detail())
  detailLoading = computed(() => this._reportService._detailLoading())
  reports = computed(() => this._reportService._reports())
  videoUrl = computed(() => {
    const videoItem = this.detail().find(detail => detail.videoData)
    if (videoItem) {
      return this.getVideoUrl(videoItem.videoData)
    }
    return '';
  })
  ngOnInit() {
    this._reportService.report()
  }

  // sanitizeVideo() {
  //   if (this.videoURL()){
  //     return this.sanitizer.bypassSecurityTrustUrl(this.videoURL()?.videoData)
  //   }
  // }

  getVideoUrl(data: any): string {
    console.log(atob(data))
    // اگر ویدیو base64 باشه
    if (typeof data === 'string') {
      // اگه header نداشت اضافه‌اش کن
      if (!data.startsWith('data:')) {
        data = `data:video/mp4;base64,${data}`;
      }
      return data;
    }

    // اگر ویدیو Blob باشه (یا ArrayBuffer)
    if (data instanceof Blob) {
      return URL.createObjectURL(data);
    }

    // اگر به‌صورت بایت‌ آرایه برگشته باشه (بعضی APIها اینجورین)
    if (data?.type === 'Buffer' && data?.data) {
      const blob = new Blob([new Uint8Array(data.data)], { type: 'video/mp4' });
      return URL.createObjectURL(blob);
    }

    return '';
  }


  openMediaModal(report: Report) {
    this._reportService.media(report.trackingCode)
    this.isUserMediaModalShown.set(true)
  }

  returnBLob() {

  }
}
