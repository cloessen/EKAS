import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'janein'
})
export class JaneinPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'fa-check-square-o' : 'fa-times';
  }
}
