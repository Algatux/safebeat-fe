import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  write(data: any): void {
    if (!environment.production) {
      console.log(data);
    }
  }

  log(data: any): void {
    this.write(data);
  }
}
