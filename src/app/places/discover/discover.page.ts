import { PlacesService } from './../../services/places.service';
import { Component, OnInit } from '@angular/core';
import Place from 'src/app/models/Place';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  places: Place[];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.places.subscribe(places => {
      this.places = places;
    });
  }

  onFilterUpdate(event: CustomEvent){
    console.log(event);
  }

}
