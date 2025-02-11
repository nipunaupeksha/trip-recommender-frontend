import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  img: any;

  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };
  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ngOnInit() {
    this.img = this.navParams.get('img');
  }

  zoom(zoomIn: boolean) {
    const z = this.slider.nativeElement.swiper.zoom;
    if (zoomIn){
      z.in();
    }else{
      z.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
