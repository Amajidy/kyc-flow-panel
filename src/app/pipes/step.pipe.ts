import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'step',
  standalone: true
})
export class StepPipe implements PipeTransform {

  transform(value: string): unknown {
    switch (value) {
      case 'VIDEO':
        return 'ویدئو';
        case 'SHAHKAR':
        return 'شاهکار';
        case 'SIGN':
        return 'امضاء';
    }
    return null;
  }

}
