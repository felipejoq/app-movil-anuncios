import { HttpClientModule } from '@angular/common/http';
import { IngresarPage } from './../pages/ingresar/ingresar';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginProvider } from '../providers/login/login';

import { IonicStorageModule } from '@ionic/storage';
import { AnunciosProvider } from '../providers/anuncios/anuncios';
import { AnuncioModal } from '../pages/anuncio/anuncio';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IngresarPage,
    AnuncioModal
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IngresarPage,
    AnuncioModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    AnunciosProvider
  ]
})
export class AppModule {}
