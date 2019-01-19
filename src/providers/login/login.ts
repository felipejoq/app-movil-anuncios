import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  constructor(public http: HttpClient) {
    console.log("Hello LoginProvider Provider");
  }

  ingresar(email: string, password: string) {
    return this.http
      .post("https://anuncios-app.herokuapp.com/api/login", { email, password })
      .pipe(
        map(res => JSON.stringify(res))
      ).toPromise();
  }
}
