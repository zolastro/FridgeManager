import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'overflow'})
export class OverflowPipe implements PipeTransform {
  transform(value: string, maxLength:number): string {
    let ans = value;  
    if(value.length > maxLength +3 ) {
        ans = value.slice(0, maxLength).trim() + "...";
    }
    return ans; 
  }
}