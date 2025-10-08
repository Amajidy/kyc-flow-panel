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
  isUserMediaModalShown = signal(false)
  detailLoading = computed(() => this._reportService._detailLoading())
  detail = computed(() => {
    return this._reportService._detail().map(detail => {
      return { ...detail,
        videoData: detail.videoData ? this.base64ToBlob(detail.videoData, "video") : null,
        signData: detail.signData ? this.base64ToBlob(detail.signData, "image") : null
      };
    })
  })
  reportsLoading = computed(() => this._reportService._reportsLoading())
  reports = computed(() => this._reportService._reports())

  selectedIndex = signal(-1)

  ngOnInit() {
    this._reportService.report()
  }

  base64ToBlob(base64: string, type: 'video' | 'image'): string {
    // اگر data: داشت، جدا می‌کنیم از قسمت base64
    const base64Index = base64.indexOf('base64,');
    const data = base64Index !== -1 ? base64.substring(base64Index + 7) : base64;

    let mimeType = 'application/octet-stream';
    const match = base64.match(/data:([^;]+);/);
    if (match) mimeType = match[1];
    else mimeType = type === 'video' ? 'video/webm' : 'image/png';

    try {
      // تبدیل base64 به بایت‌ها
      const byteCharacters = atob(data.trim());
      const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      return URL.createObjectURL(blob);

    } catch (err) {
      console.error('❌ Invalid base64 data:', err);
      console.log('Base64 sample:', base64.slice(0, 100)); // برای دیباگ
      return '';
    }
    }


  openMediaModal(report: Report) {
    this._reportService.media(report.trackingCode)
    this.isUserMediaModalShown.set(true)
  }
}
