import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SelecionePage } from '../pages/selecione/selecione';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';

import { AuthService } from './../providers/auth.service';
import { UserService } from './../providers/user.service';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyC4DC1iayAoawdRqOTfK1JkHchYNPcxag4",
  authDomain: "chat-1b9c1.firebaseapp.com",
  databaseURL: "https://chat-1b9c1.firebaseio.com",
  projectId: "chat-1b9c1",
  storageBucket: "chat-1b9c1.appspot.com",
  messagingSenderId: "976944908324"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SelecionePage,
    CadastroPage,
    LoginPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SelecionePage,
    CadastroPage,
    LoginPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
