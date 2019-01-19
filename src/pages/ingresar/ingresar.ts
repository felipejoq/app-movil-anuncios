import { HomePage } from "./../home/home";
import { LoginProvider } from "./../../providers/login/login";
import { Component } from "@angular/core";
import {
  NavController,
  ToastController,
  Platform,
  LoadingController
} from "ionic-angular";

import { Storage } from "@ionic/storage";

@Component({
  selector: "page-ingresar",
  templateUrl: "ingresar.html"
})
export class IngresarPage {
  datos = {
    email: "test1@test1.com",
    password: "123"
  };

  constructor(
    public navCtrl: NavController,
    private loginProvider: LoginProvider,
    private toastCtrl: ToastController,
    private plt: Platform,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
  }

  ingresar() {
    this.loginProvider
      .ingresar(this.datos.email, this.datos.password)
      .then((resp: any) => {
        let respuesta = JSON.parse(resp);
        console.log("Esta es la respuesta: ", respuesta);

        if (!this.plt.is("cordova")) {
          localStorage.setItem("token", respuesta.token);
          localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));
        } else {
          this.storage.set("token", respuesta.token);
          this.storage.set("usuario", respuesta.usuario);
        }

        if (respuesta.ok) {
          this.mostrarToast("Correcto");
        }
      })
      .catch(err => {
        console.log(err);
        if (err) {
          this.mostrarToast("Error: " + err.error.err.message);
        }
      });
  }

  irHome() {
    this.navCtrl.setRoot(HomePage);
    this.presentLoadingDefault();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: "Por favor espere..."
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  mostrarToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
      this.irHome();
    });

    toast.present();
  }
  

}
