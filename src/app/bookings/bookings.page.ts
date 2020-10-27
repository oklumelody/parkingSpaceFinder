import { BookingService } from './../services/booking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  firebase;

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getfirebase().subscribe({
      next: (data) => {
        this.firebase = data;
        console.log(this.firebase);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
