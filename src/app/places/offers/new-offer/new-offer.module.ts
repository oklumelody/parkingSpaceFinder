import { ImagePickerComponent } from './../../../components/image-picker/image-picker.component';
import { LocationPickerComponent } from './../../../components/location-picker/location-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NewOfferPageRoutingModule } from './new-offer-routing.module';

import { NewOfferPage } from './new-offer.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NewOfferPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewOfferPage,
  LocationPickerComponent,
  ImagePickerComponent]
})
export class NewOfferPageModule {}
