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
        title: 'Parkim me pagese',
        description: 'Rruga Vace Zela - 100ALL/hour',
        imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2018%2F09%2F25%2F599350-Cesar_Bazkez-parking_lot-garages-architecture-748x463.jpg&imgrefurl=https%3A%2F%2Fwallup.net%2Fcesar-bazkez-parking-lot-garages-architecture%2F&tbnid=mZsBXZEgrm2miM&vet=12ahUKEwji-pas7ofvAhUQP-wKHQk9AycQMygaegUIARD9AQ..i&docid=4y4YCuDMxQjf4M&w=748&h=463&q=parking%20photo&client=ubuntu&ved=2ahUKEwji-pas7ofvAhUQP-wKHQk9AycQMygaegUIARD9AQ',
        price: 1,
        availableFrom: new Date('2019-01-01'),
        availableTo: new Date('2019-01-01'),
        userId: 'abc'
      },
      {
        id: '2',
        title: 'Parkim me pagese',
        description: 'Rruga Ibrahim Rugova - 100ALL/hour',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwOdIeKj8T3k05C_SBdsnWDaYkcTitZXs4g&usqp=CAU',
        price: 1,
        availableFrom: new Date('2019-01-01'),
        availableTo: new Date('2019-01-01'),
        userId: 'abc'
      },
      {
        id: '3',
        title: 'Parkim me pagese',
        description: 'Blv Zogu I - 150ALL/hour',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmeP8InDZ_veSgbNelew_k72gvfO_eHEgyWA&usqp=CAU',
        price: 1.5,
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
