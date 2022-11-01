import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLineDate'
})
export class NewLineDatePipe implements PipeTransform {

  transform(value: string | null, arg: string): unknown {
    return (<string>value).split(arg).join('/n');

  }

}
