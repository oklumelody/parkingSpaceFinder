import { Router } from '@angular/router';
import { PlacesService } from './../../../services/places.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private placesService: PlacesService,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    })
  }

  onCreateOffer(){
    if(!this.form.valid){
      return;
    }

    this.placesService.addPlace(
      this.form.value.title,
      this.form.value.description,
      this.form.value.price,
      this.form.value.dateFrom,
      this.form.value.dateTo
    );

    this.form.reset();
    this.router.navigateByUrl('/places/tabs/offers');
    }

  get f() {
    return this.form.controls;
  }

}
