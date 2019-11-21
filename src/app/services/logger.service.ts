import { environment } from 'src/environments/environment';
import {formatDate} from '@angular/common';

export class Logger {

  constructor() { }

  static write(data: any): void {
    if (!environment.production) {
      const time = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
      if (typeof data === 'string') {
        console.log(`[${time}] ${data}`);
      } else {
        console.log(`[${time}]`, data);
      }
    }
  }

  static condWrite(data: any, mustWrite: boolean): void {
    if ( true === mustWrite) {
      this.write(data);
    }
  }

}
