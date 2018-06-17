import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecionePage } from './selecione';

@NgModule({
  declarations: [
    SelecionePage,
  ],
  imports: [
    IonicPageModule.forChild(SelecionePage),
  ],
})
export class SelecionePageModule {}
