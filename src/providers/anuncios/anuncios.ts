import { Platform } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";


import { Storage } from "@ionic/storage";

@Injectable()
export class AnunciosProvider {
  
  token:string;

  constructor(public http: HttpClient,
              public plt: Platform,
              public storage: Storage) {
    console.log('Hello AnunciosProvider Provider');
  }

  obtenerAnuncios(){

    if(!this.plt.is('cordova')){
      this.token = localStorage.getItem('token');
    }else{
      this.storage.get('token')
      .then(tokendb => {
          this.token = tokendb;
      })
      .catch(e => console.log('Hubo un error en la obtención del token'));
    }

    let headers = new HttpHeaders({
      'token' : this.token
    });

    return this.http.get('https://anuncios-app.herokuapp.com/api/anuncio', { headers })
    .pipe(
      map(res => JSON.stringify(res))
    ).toPromise();
  }

}
