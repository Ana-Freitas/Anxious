import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { CadastroPage } from './../cadastro/cadastro';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formLogin: FormGroup;

  constructor(  
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
     public navParams: NavParams,
    ) {
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.formLogin = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  
    
  }

  Enviar(): void {
    let loading: Loading = this.Carregando();

    this.authService.signinWithEmail(this.formLogin.value)
    .then((isLogged: boolean) => {

      if (isLogged) {
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      }

    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });

  }

  Cadastrar(): void {
    this.navCtrl.push(CadastroPage);
  }

  private Carregando(): Loading {
    let carregando: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });

    carregando.present();

    return carregando;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
