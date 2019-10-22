import { environment } from 'src/environments/environment';

export class Logger {

  constructor() { }

  static write(data: any): void {
    if (!environment.production) {
      console.log(data);
    }
  }

  static condWrite(data: any, mustWrite: boolean): void {
    if ( true === mustWrite) {
      this.write(data);
    }
  }

}
