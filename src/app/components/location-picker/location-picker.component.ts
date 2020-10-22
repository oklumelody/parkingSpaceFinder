import { MapModalComponent } from '../map-modal/map-modal.component';
import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}

  onPickLocation(){
    this.actionSheetCtrl.create({header: 'Choose', buttons: [
      {
        text: 'Auto-Locate',
        handler: () => {
          this.locateUser();
        }
      },
      {
        text: 'Pick On Map',
        handler: () => {
          this.modalCtrl.create({ component: MapModalComponent }).then(modelEl=>{
            modelEl.present();
          });
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]}).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }


  private locateUser() {
    if(!Capacitor.isPluginAvailable('Geolocation')){
      console.log('Cant use GeoLocation');
      return;
    }
    Plugins.Geolocation.getCurrentPosition().then(geoPositiom => {
      console.log(geoPositiom);
    }).catch(err => {
      console.log("Error");
    });
  }
}
