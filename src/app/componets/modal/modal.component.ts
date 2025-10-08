import { Component, EventEmitter, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf
  ]
})
export class ModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<void>();


  @Input() title = '';
  @Input() closable = true;
  @Input() maskClosable = true;
  @Input() width = '520px';


  @ContentChild('modalFooter', { read: TemplateRef }) footerTpl?: TemplateRef<any>;


  onMaskClick() {
    if (this.maskClosable) {
      this.hide();
    }
  }


  hide() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.close.emit();
  }
}
