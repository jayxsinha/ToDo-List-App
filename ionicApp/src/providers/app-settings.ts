import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppSettings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const CONFIG = {
  apiUrl: "https://polar-refuge-60046.herokuapp.com/"
};
@Injectable()
export class AppSettings {
  constructor() {}
  public getApiUrl() {
  return CONFIG.apiUrl;
  }

}
