import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { ValidationModule } from 'validation-pin';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    ValidationModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
