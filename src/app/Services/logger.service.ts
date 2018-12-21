import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  write(message: string): void {
    console.log(message);
  }

  log(object: Object): void {
    console.log(object);
  }
}
