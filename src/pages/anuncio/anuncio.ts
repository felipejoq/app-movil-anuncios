import { AnunciosProvider } from './../../providers/anuncios/anuncios';
import { Component } from '@angular/core';
import { NavController, Platform, ToastController, NavParams, ViewController } from 'ionic-angular';

import { Storage } from "@ionic/storage";


@Component({
  selector: 'modal-anuncio',
  templateUrl: 'anuncio.html'
})
export class AnuncioModal {

  anuncio:any;

  constructor(public navCtrl: NavController,
              public anunciosProvider: AnunciosProvider,
              public storage: Storage,
              public plt: Platform,
              public toastCtrl: ToastController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
                this.anuncio = this.navParams.get('anuncio');
                console.log(this.anuncio);
  }

  mostrarToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  cerrarModal(){
    this.viewCtrl.dismiss();
  }
}
