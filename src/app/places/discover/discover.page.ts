import { PlacesService } from './../../services/places.service';
import { Component, OnInit } from '@angular/core';
import Place from 'src/app/models/Place';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
 import { ModalController} from '@ionic/angular';  

 @Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  places: Place[];
  logininfo: any;
  user: any;

  // constructor(private placesService: PlacesService,private route: ActivatedRoute, private router: Router) {
  //   this.route.queryParams.subscribe(params => {
  //     if (params && params.userinfo) {
  //       this.logininfo = JSON.parse(params.userinfo);
  //     }
  //   });
  //  }
  
  constructor(public modalCtrl: ModalController) {}   
   
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: ModalPage  
    });  
    return await modal.present();   
  }

  ngOnInit() {
    this.placesService.places.subscribe(places => {
      this.places = places;
    });
  }

  onFilterUpdate(event: CustomEvent){
    console.log(event);
  }

}