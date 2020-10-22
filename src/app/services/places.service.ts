import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Place from '../models/Place';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places = new BehaviorSubject<Place[]>(
    [
      {
        id: '1',
        title: 'Manhattan Mansion',
        description: 'In the heart of New York City',
        imageUrl: 'https://via.placeholder.com/400',
        price: 149.99,
        availableFrom: new Date('2019-01-01'),
        availableTo: new Date('2019-01-01'),
        userId: 'abc'
      },
      {
        id: '2',
        title: 'Manhattan Mansion',
        description: 'In the heart of New York City',
        imageUrl: 'https://via.placeholder.com/400',
        price: 149.99,
        availableFrom: new Date('2019-01-01'),
        availableTo: new Date('2019-01-01'),
        userId: 'abc'
      },
      {
        id: '3',
        title: 'Manhattan Mansion',
        description: 'In the heart of New York City',
        imageUrl: 'https://via.placeholder.com/400',
        price: 149.99,
        availableFrom: new Date('2019-01-01'),
        availableTo: new Date('2019-01-01'),
        userId: 'abc'
      }
    ]
  ) ;

  constructor() { }

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string){
    return this.places.pipe(take(1), map(places => {
      return places.find(p=> p.id === id);
    }));
  }

  addPlace(title, desc, price, dateFrom, dateTo){
    this.places.pipe(take(1)).subscribe((places)=>{
      this._places.next(places.concat({
        id: Math.random().toString(),
        title: title,
        description: desc,
        imageUrl: 'https://via.placeholder.com/400',
        price: price,
        availableFrom: dateFrom,
        availableTo: dateTo,
        userId: 'abc'
      }))
    });
  }
}
