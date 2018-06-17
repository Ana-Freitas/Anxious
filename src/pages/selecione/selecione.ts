import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { CadastroPage } from '../cadastro/cadastro';


@IonicPage()
@Component({
  selector: 'page-selecione',
  templateUrl: 'selecione.html',
})
export class SelecionePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  Logar() {
    this.navCtrl.push(LoginPage);
  }
   Cadastrar() {
    this.navCtrl.push(CadastroPage);
  }


}
