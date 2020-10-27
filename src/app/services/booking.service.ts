import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }


  getfirebase(){
    console.log("bookings");
    return this.http.get('https://ionic-booking-93ce3.firebaseio.com/test.json');
  }

}
