import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataPropertyGetter',
  standalone: true
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform(value: any, property: string): any {
    if (!value || !property) {
      return value;
    }

    return value[property];
  }

}
