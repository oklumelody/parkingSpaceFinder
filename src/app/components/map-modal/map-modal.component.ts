import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: ElementRef;

  constructor(private modalCtrl: ModalController, private renderer: Renderer2) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getGoogleMaps().then(
      googleMaps => {
        const mapEl = this.mapElement.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 16
        });

        googleMaps.eveny.addLisenerOnce(map, 'idle', ()=> {
          this.renderer.addClass(mapEl, 'visible');
        })
      }
    ).catch(err => {
      console.log(err);
    });
  }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  private getGoogleMaps (): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBw6faFLKE0vi0pbxOh59MivBj4c5GVd_I';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(googleModule && googleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps not loaded');
        }
      }
    })
  }

}
