import { AnuncioModal } from "./../anuncio/anuncio";
import { IngresarPage } from "./../ingresar/ingresar";
import { AnunciosProvider } from "./../../providers/anuncios/anuncios";
import { Component } from "@angular/core";
import {
  NavController,
  Platform,
  ToastController,
  ModalController
} from "ionic-angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  usuario: any = {};
  anuncios: any[] = [];

  constructor(
    public navCtrl: NavController,
    public anunciosProvider: AnunciosProvider,
    public storage: Storage,
    public plt: Platform,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {}

  presentarModal(anuncio: any) {
    const modal = this.modalCtrl.create(AnuncioModal, { anuncio });
    modal.present();
  }

  ionViewDidLoad() {
    //your code;

    this.obtenerUsuario();
    this.obtenerAnunciosP();
  }

  verificaLogin() {
    if (!this.plt.is("cordova")) {
      let token = localStorage.getItem("token");
      if (token) {
        this.navCtrl.setRoot(HomePage);
      } else {
        this.navCtrl.setRoot(IngresarPage);
      }
    } else {
      this.storage
        .get("token")
        .then(token => {
          if (token) {
            this.navCtrl.setRoot(HomePage);
          } else {
            this.navCtrl.setRoot(IngresarPage);
          }
        })
        .catch(e => {
          this.navCtrl.setRoot(IngresarPage);
        });
    }
  }

  cerrarSesion() {
    if (!this.plt.is("cordova")) {
      localStorage.clear();
      this.navCtrl.setRoot(IngresarPage);
      this.mostrarToast("Sesión cerrada");
     
    } else {
      this.storage
        .clear()
        .then(() => {
          this.navCtrl.setRoot(IngresarPage);
          this.mostrarToast("Sesión cerrada");
        })
        .catch(e => {
          console.log(e);
          this.navCtrl.setRoot(IngresarPage);
          this.mostrarToast("Ocurrió un error");
        });
    }
  }

  obtenerUsuario() {
    if (!this.plt.is("cordova")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      console.log("Este es el usuario: ", this.usuario);
    } else {
      this.storage
        .get("usuario")
        .then(usuario => {
          this.usuario = usuario;
        })
        .catch(e => console.log("Hubo un error al obtener el usuario"));
    }
  }

  obtenerAnunciosP() {
    this.anunciosProvider
      .obtenerAnuncios()
      .then((resp: any) => {
        let anunciosDB = JSON.parse(resp);
        console.log("Estos son los anuncios: ", anunciosDB);
        this.anuncios = anunciosDB.anuncios;
      })
      .catch(e => {
        console.log(e);
        if (e.status === 401) {
          this.mostrarToast("Su sesión ha caducado. Ingrese nuevamente.");
          this.navCtrl.setRoot(IngresarPage);
        }
      });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    this.anunciosProvider
      .obtenerAnuncios()
      .then((resp: any) => {
        let cantAnuncios = this.anuncios.length;
        let anunciosDB = JSON.parse(resp);
        this.anuncios = anunciosDB.anuncios;
        if (this.anuncios.length === cantAnuncios) {
          this.mostrarToast("No hay anuncios nuevos");
        }
        refresher.complete();
      })
      .catch(e => {
        console.log("Error al obtener los anuncios");
        this.mostrarToast("Error al actualizar los anuncios");
      });
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
}
