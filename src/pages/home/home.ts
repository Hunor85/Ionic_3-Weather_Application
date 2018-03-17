import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Weather } from '../../providers/weather';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 weather:any;
  location:{
    city:string,
    country:string
  }

  constructor(public navCtrl: NavController, 
    private weatherProvider:Weather,
    private storage:Storage) {
  }

    ionViewWillEnter(){
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Copenhagen',
          country: 'Denmark'
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.country)  .subscribe(weather => {
          this.weather = weather.current_observation;
        });
    });
  }

}
