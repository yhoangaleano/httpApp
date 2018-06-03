import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJornaleroPage } from './create-jornalero';

@NgModule({
  declarations: [
    CreateJornaleroPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJornaleroPage),
  ],
})
export class CreateJornaleroPageModule {}
