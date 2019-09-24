import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from '../../models/Subscription';
import {Ticket} from '../../models/Ticket';
import {LoadingService} from '../../services/loading.service';
import {UserType} from '../../models/UserType';
import {Subject} from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss']
})
export class AccountComponent {

    public userSub: Subscription;
    public Tickets: Ticket[];
    public Refresher: Subject<object>;

    constructor(public auth: AuthService, public loading: LoadingService, public alertCtrl: AlertController, public navCtrl: NavController) {
        this.Refresher = new Subject<object>();
    }

    ionViewWillEnter() {
        this.Refresher.next(null);
    }

    GetTypeName(id: number) {
        return UserType[id];
    }

    Disconnect() {
       this.alertCtrl.create({
        header: "Confirmer",
        message: "Se Deconnecter ?",
        buttons: [
          {
            text: "Annuler",
            role: "cancel",
          },
          {
            text: "Oui",
            handler: () => {
              localStorage.clear();
              this.auth.User = null;
              this.auth.UserType = null;
              this.auth.Subscription = null;
              this.auth.UserId = -1;
              this.auth.PlaceId = -1;
              this.navCtrl.navigateRoot('Auth');
            }
          },
        ],
      }).then(alert => alert.present())      
    }
}
