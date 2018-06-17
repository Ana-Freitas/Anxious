import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicPage, AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/first';

import { AuthService } from './../../providers/auth.service';
import { HomePage } from './../home/home';
import { UserService } from './../../providers/user.service';

import * as firebase from 'firebase/app';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formCadastro: FormGroup;

  constructor( public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {

      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.formCadastro = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  Criar(): void {
    let loading: Loading = this.Carregando();
    let formUser = this.formCadastro.value;
    let username: string = formUser.username;

    this.userService.userExists(username)
    .first()
    .subscribe((userExists: boolean) => {

      if (!userExists) {

        this.authService.createAuthUser({
          email: formUser.email,
          password: formUser.password
        }).then((authUser: firebase.User) => {

          delete formUser.password;
          let uuid: string = authUser.uid;

          this.userService.create(formUser, uuid)
            .then(() => {
              console.log('Usuario cadastrado!');
              this.navCtrl.setRoot(HomePage);
              loading.dismiss();
            }).catch((error: any) => {
              console.log(error);
              loading.dismiss();
              this.showAlert(error);
            });

        }).catch((error: any) => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error);
        });

      } else {

        this.showAlert(`O username ${username} já está sendo usado em outra conta!`);
        loading.dismiss();

      }

    });
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
 

}
