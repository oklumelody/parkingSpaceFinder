import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';


@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class VerifyModule { 

}
