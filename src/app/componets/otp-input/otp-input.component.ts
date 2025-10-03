import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  ElementRef,
  QueryList,
  OnInit,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  standalone: true
})
export class OtpInputComponent implements OnInit, AfterViewInit {
  @Input() length: number = 6; // تعداد ارقام OTP
  @Output() complete = new EventEmitter<string>(); // خروجی نهایی کد

  // دسترسی به المان‌های Input در HTML
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  otp: string[] = []; // آرایه‌ای برای نگهداری مقادیر فیلدها

  // فعال کردن قابلیت autofill از طریق پیامک
  // 'one-time-code' یک مقدار استاندارد برای این قابلیت است.
  autocomplete: string = 'one-time-code';

  ngOnInit() {
    // مقداردهی اولیه آرایه OTP
    this.otp = new Array(this.length).fill('');
  }

  ngAfterViewInit() {
    // تمرکز خودکار روی فیلد اول پس از بارگذاری کامپوننت
    this.focusInput(0);
  }

  /**
   * @desc جابجایی خودکار به فیلد بعدی بعد از وارد کردن رقم.
   * @param event رویداد ورودی
   * @param index ایندکس فیلد جاری
   */
  onInput(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // همیشه اطمینان حاصل می‌کنیم که فقط یک رقم گرفته شده است (برای جلوگیری از رفتار غیرمنتظره مرورگرها)
    if (value.length > 1) {
      // اگر طول بیشتر از یک بود (احتمالا Autofill یا Paste دستی بدون استفاده از رویداد Paste)
      this.onSmsAutofill(event);
      return;
    }

    // اطمینان از اینکه فقط یک عدد وارد شده است
    if (!/^\d*$/.test(value)) {
      inputElement.value = '';
      return;
    }

    this.otp[index] = value;

    if (value && index < this.length - 1) {
      // تمرکز (Focus) روی فیلد بعدی
      this.focusInput(index + 1);
    }

    this.checkCompletion();
  }

  /**
   * @desc پشتیبانی از Backspace، فلش‌ها و جابجایی بین فیلدها.
   * @param event رویداد کلید
   * @param index ایندکس فیلد جاری
   */
  onKeyDown(event: KeyboardEvent, index: number): void {
    const inputElement = event.target as HTMLInputElement;

    // Backspace: رفتن به فیلد قبلی و پاک کردن آن
    if (event.key === 'Backspace') {

      if (inputElement.value) {
        // حالت ۱: فیلد جاری پر است. فقط فیلد جاری را پاک کن و همانجا بمان.
        this.otp[index] = '';
        inputElement.value = ''; // تمیز کردن مقدار در DOM
      } else if (index > 0) {
        // حالت ۲: فیلد جاری خالی است. به فیلد قبلی برو، آن را پاک کن و Focus را ببر.
        event.preventDefault(); // جلوگیری از رفتار پیش‌فرض Backspace
        this.otp[index - 1] = ''; // پاک کردن مقدار فیلد قبلی
        this.focusInput(index - 1); // رفتن به فیلد قبلی
      }

      this.checkCompletion();
    }
    // جهت چپ: رفتن به فیلد قبلی
    else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }
    // جهت راست: رفتن به فیلد بعدی
    else if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    }
    // جلوگیری از وارد کردن کاراکترهای غیرعددی (به جز کلیدهای کنترلی)
    else if (isNaN(Number(event.key)) && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
    }
  }

  /**
   * @desc پِیست کامل: کل کد را در فیلدهای مربوطه پر می‌کند.
   * @param event رویداد پِیست
   */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';

    // بهبود: فقط اعداد متوالی را از کل متن پیامک استخراج می‌کند.
    // این ریجکس '^\d{6}$' را برای طول دقیق '6' پیدا می‌کند.
    const fullCodeMatch = pasteData.match(/\d{4,}/); // پیدا کردن حداقل 4 رقم متوالی
    let pastedCode = fullCodeMatch ? fullCodeMatch[0] : '';

    // اگر کد پیدا شده بزرگتر از طول مورد نظر است، آن را به طول مورد نظر برش می‌دهیم (معمولا 6)
    if (pastedCode.length > this.length) {
      pastedCode = pastedCode.substring(0, this.length);
    }

    if (!pastedCode) return;

    // پر کردن فیلدها با کد پِیست شده
    for (let i = 0; i < this.length; i++) {
      this.otp[i] = pastedCode[i] || '';
    }

    // تمرکز روی آخرین فیلدی که مقدار گرفت یا آخرین فیلد
    const nextFocusIndex = Math.min(this.length - 1, pastedCode.length - 1);
    this.focusInput(nextFocusIndex);

    this.checkCompletion();
  }

  /**
   * @desc مدیریت پر شدن خودکار (Autofill) توسط مرورگر که فقط فیلد اول را پر می‌کند.
   * @param event رویداد ورودی
   */
  onSmsAutofill(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    // اگر طول مقدار وارد شده بزرگتر از 1 و برابر طول OTP باشد
    if (value.length >= this.length) {
      // کپی کردن مقدار به ClipboardData برای استفاده در onPaste
      const mockClipboardEvent = {
        preventDefault: () => {},
        clipboardData: {
          getData: () => value
        }
      } as unknown as ClipboardEvent;

      this.onPaste(mockClipboardEvent);
    }
  }


  /**
   * @desc بررسی می‌کند که آیا همه فیلدها پر شده‌اند یا نه و در صورت تکمیل، کد کامل را Emit می‌کند.
   */
  checkCompletion(): void {
    const fullCode = this.otp.join('');
    // بررسی می‌کند که طول کد کامل با طول مورد نظر برابر باشد و هیچ فیلدی خالی نباشد.
    if (fullCode.length === this.length && !this.otp.includes('')) {
      this.complete.emit(fullCode);
    }
  }

  /**
   * @desc اعمال تمرکز (Focus) روی یک فیلد خاص
   * @param index ایندکس فیلد برای Focus
   */
  focusInput(index: number): void {
    // اطمینان از اینکه index معتبر است
    if (index < 0 || index >= this.length) return;

    // از setTimeout استفاده می‌کنیم تا مطمئن شویم DOM به‌روزرسانی شده
    setTimeout(() => {
      const input = this.otpInputs.toArray()[index];
      if (input) {
        input.nativeElement.focus();
        input.nativeElement.select(); // انتخاب متن برای جایگزینی آسان‌تر
      }
    }, 0);
  }
}
