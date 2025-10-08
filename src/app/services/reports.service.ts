import {inject, Injectable, signal} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {baseUrl} from "../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Details, Report} from "../entities/reports";
import {ApiResponse} from "../entities/auth";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private _http = inject(HttpClient);
  _reports = signal<Report[]>([]);
  _detail = signal<Details[]>([]);
  _reportsLoading = signal<boolean>(false);
  _detailLoading = signal<boolean>(false);
  private async reportAction() {
    return await firstValueFrom(this._http.get<ApiResponse<Report[]>>(baseUrl + 'admin/reports'))
  }

  report() {
    this._reportsLoading.set(true);
    this.reportAction().then(result => {
      this._reports.set(result.result);
    }).finally(() => this._reportsLoading.set(false));
  }

  private async mediaAction(trackingCode:string) {
    return await firstValueFrom(this._http.get<Details[]>(baseUrl + 'admin/verification/details?trackingCode=' + trackingCode))
  }

  media(trackingCode:string) {
    this._detailLoading.set(true);
    this.mediaAction(trackingCode).then(result => {
      console.log(result);
      this._detail.set(result);
    }).finally(() => this._detailLoading.set(false));
  }



  /**
   * یک رشته Base64 (شامل پیشوند 'data:MIME_TYPE;base64,...') را به یک شیء Blob تبدیل می‌کند.
   *
   * @param base64Data رشته کامل Base64 (مثلاً: "data:video/webm;base64,...")
   * @returns یک Blob که نوع MIME آن از پیشوند استخراج شده است.
   */
  base64DataToBlob(base64Data: string): Blob {
    // ۱. بررسی کنید که آیا داده معتبر است یا خیر
    if (!base64Data || typeof base64Data !== 'string') {
      throw new Error("Input must be a non-empty string.");
    }

    // ۲. جدا کردن پیشوند MIME و رشته Base64
    const parts = base64Data.split(',');
    if (parts.length !== 2) {
      // اگر کاما وجود نداشت، فرض می‌کنیم که فقط رشته Base64 بدون پیشوند است.
      // در این حالت، MIME Type را "application/octet-stream" قرار می‌دهیم.
      const base64WithoutPrefix = base64Data;
      const mimeType = 'application/octet-stream';

      // تمیز کردن و دیکد کردن در مرحله بعدی انجام می‌شود.
      return this.convertBase64ToBlob(base64WithoutPrefix, mimeType);
    }

    const header = parts[0]; // مثال: "data:video/webm;codecs=vp9,opus;base64"
    const base64WithoutPrefix = parts[1]; // رشته Base64 خالص

    // ۳. استخراج نوع MIME از پیشوند
    // به دنبال الگوی : (MIME_TYPE) ; می‌گردد
    const mimeMatch = header.match(/:(.*?)(;|$)/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

    return this.convertBase64ToBlob(base64WithoutPrefix, mimeType);
  }

// ----------------------------------------------------
// تابع کمکی برای انجام تبدیل واقعی و جلوگیری از خطای atob
// ----------------------------------------------------
  convertBase64ToBlob(base64String: string, mimeType: string): Blob {
    // حذف تمام کاراکترهای فضای خالی (whitespace) برای جلوگیری از InvalidCharacterError در atob
    const cleanedBase64 = base64String.replace(/[^A-Za-z0-9+/=]/g, '');

    console.log(cleanedBase64)
    // دیکد کردن Base64
    const byteCharacters = atob(cleanedBase64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // ساخت Blob
    return new Blob([byteArray], { type: mimeType });
  }


}
