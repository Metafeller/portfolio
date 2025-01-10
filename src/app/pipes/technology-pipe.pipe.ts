import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'technologyPipe',
  standalone: true
})
export class TechnologyPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
