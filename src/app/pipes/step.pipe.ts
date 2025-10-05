import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'step',
  standalone: true
})
export class StepPipe implements PipeTransform {

  transform(value: string): unknown {
    switch (value) {
      case 'Step VIDEO':
        return 'ویدئو';
        case 'Step SHAHKAR':
        return 'شاهکار';
        case 'Step SIGN':
        return 'امضاء';

    }
    return null;
  }

}
