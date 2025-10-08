import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalPayload {
  title?: string;
  content?: string | TemplateRef<any>;
  showClose?: boolean;
  // any extra metadata you want
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _modal$ = new BehaviorSubject<ModalPayload | null>(null);
  readonly modal$ = this._modal$.asObservable();

  open(payload: ModalPayload) {
    this._modal$.next(payload);
  }

  close() {
    this._modal$.next(null);
  }

  // convenience confirm helper
  confirm(title: string, message: string): Promise<boolean> {
    return new Promise(resolve => {
      const payload: ModalPayload = { title, content: message, showClose: false };
      this.open(payload);

      const onClose = (result: boolean) => {
        this.close();
        resolve(result);
      };

      // to keep things simple, attach temporary handlers on window for this call
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose(false);
        }
      };
      window.addEventListener('keydown', handleKey);

      // Listen for close via a short-lived subject pattern could be better; for simplicity the consumer should call resolve via service methods
      // We will expose helper methods on service to accept confirm result:
      (this as any)._confirmResolver = (res: boolean) => {
        window.removeEventListener('keydown', handleKey);
        onClose(res);
        delete (this as any)._confirmResolver;
      };
    });
  }

  // internal helper used by modal component to resolve confirm()
  _resolveConfirm(result: boolean) {
    if ((this as any)._confirmResolver) (this as any)._confirmResolver(result);
  }
}
