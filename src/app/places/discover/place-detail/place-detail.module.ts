import { CreateBookingComponent } from './../../../components/create-booking/create-booking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent]
})
export class PlaceDetailPageModule {}