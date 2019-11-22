import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { CheckinService } from '../../services/CheckinService';
import { Checkin } from '../../models/Checkin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    checkin: Checkin = new Checkin();

    constructor(
      public navCtrl: NavController, 
      public loadCtrl: LoadingController,
      public alertCtrl: AlertController,
      public _checkinService: CheckinService
    ) {}
    
    doCheckin() {
      let loading: Loading = this._showLoading();

      this._checkinService.checkin(this.checkin)
        .subscribe(response => {
          loading.dismiss();        
          console.log(response);

          let message = "Obrigado por estar presente no JUG Vale 15 * " + this.checkin.name.toUpperCase() + " *"
          this.checkin.name = '';
          this.checkin.email = '';

          this._showAlert(message)
        }, error => {
          loading.dismiss();
          console.log(error);
          this._showAlert("Erro em realizar o checkin. Provavelmente o email está inválido ou a presença já foi confirmada!")
        });
    }  

    private _showLoading(): Loading {
      let loading: Loading = this.loadCtrl.create({
        content: 'Please wait...'
      });
  
      loading.present();
  
      return loading;
    }
  
    private _showAlert(message: any): void {
      this.alertCtrl.create({
        message: message,
        buttons: ['Ok']
      }).present();
    }
}