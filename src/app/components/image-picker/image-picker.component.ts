import { Platform } from '@ionic/angular';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePicker: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string;
  usePicker = false;

  constructor(private platform: Platform) { }

  ngOnInit() {
    if (this.platform.is('mobile') && !this.platform.is('hybrid') || !this.platform.is('desktop')) {
      this.usePicker =true;
    }
  }

  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera') || this.usePicker) {
      this.filePicker.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    }).then(image => {
      this.selectedImage = 'data:image/png;base64, ' + image.base64String;
      this.imagePick.emit(this.selectedImage);
    }).catch(err => {
      console.log(err);
      return false;
    });
  }

  onFileChoose(event){
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePick.emit(pickedFile);
    };
    fr.readAsDataURL(pickedFile);
  }

}