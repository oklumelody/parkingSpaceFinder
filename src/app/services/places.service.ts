import { Injectable } from '@angular/core';
import Place from '../models/Place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    {
      id: '1',
      title: 'Manhattan Mansion',
      description: 'In the heart of New York City',
      imageUrl: 'https://via.placeholder.com/400',
      price: 149.99
    },
    {
      id: '2',
      title: 'Manhattan Mansion',
      description: 'In the heart of New York City',
      imageUrl: 'https://via.placeholder.com/400',
      price: 149.99
    },
    {
      id: '3',
      title: 'Manhattan Mansion',
      description: 'In the heart of New York City',
      imageUrl: 'https://via.placeholder.com/400',
      price: 149.99
    }
  ];

  constructor() { }

  get places() {
    return this._places;
  }

  getPlace(id: string){
    return this._places.find(place => place.id === id);
  }
}
