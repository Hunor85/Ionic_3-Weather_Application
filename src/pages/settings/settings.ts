import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
	city:string;
  	country:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {

      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
          this.country = location.country;
        } else {
          this.city = 'Copenhagen';
          this.country = 'Denmark';
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  saveForm(){
    let location = {
      city: this.city,
      country: this.country
    }
    this.storage.set('location', JSON.stringify(location));
    this.navCtrl.push(HomePage);
  }

}