import { HotelService } from './../../services/hotel.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ImageModalPage } from './../image-modal/image-modal.page';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  userId: string;
  selectedTrip = null;
  travelList = [];
  hotelList = [];
  buddies= '';
  sliderOpts = {
    zoom: false,
    slidesPerView: 3,
    initialSlide: 1,
    loop: true,
    centeredSlides: true,
    spaceBetween: 10
  };

  constructor(
    private modalController: ModalController,
    private router: Router,
    private userService: UserService,
    private navParams: NavParams,
    private hotelService: HotelService,
  ) {
    this.userId = this.getDecodedAccessToken(localStorage.getItem("token"))['user_id'];
  }

  ngOnInit() {
    this.selectedTrip = this.navParams.get('custom_value');
    this.buddies  = this.navParams.get('buddies');
    this.getTravelValues();
    this.getHotelById();
  }

  async closeMedia() {
    await this.modalController.dismiss();
  }

  getHotelById(){
    this.hotelList = [];
    this.hotelService.getHotelById(this.selectedTrip['hotelId']).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      if (data['data'].length > 0) {
        // tslint:disable
        for (let i in data['data']) {
          // tslint:disable-next-line: no-string-literal
          this.hotelList.push(data['data'][i]);
        }
      }
    });
  }

  getTravelValues() {
    this.travelList = [];
    this.userService.getTravelList().subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      if (data['data'].length > 0) {
        // tslint:disable
        for (let i in data['data']) {
          // tslint:disable-next-line: no-string-literal
          this.travelList.push(data['data'][i]);
        }
      }
    });
  }


  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img:this.selectedTrip['tripDestinationId']+'/'+img
      }
    }).then(modal => modal.present());
  }

  joinTrip(b){
    let x = Number.parseInt(b)+Number.parseInt(this.buddies);
    console.log(x);
    
    this.userService.joinTrip(x,this.buddies,this.userId,this.selectedTrip['tripId']).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      if (data['data'].length > 0) {
        // tslint:disable
        for (let i in data['data']) {
          // tslint:disable-next-line: no-string-literal
          this.travelList.push(data['data'][i]);
        }
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
