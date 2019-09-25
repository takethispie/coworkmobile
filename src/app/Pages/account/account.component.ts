import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Subscription} from '../../models/Subscription';
import {Ticket} from '../../models/Ticket';
import {LoadingService} from '../../services/loading.service';
import {UserType} from '../../models/UserType';
import {Subject} from 'rxjs';
import { AlertController, NavController, ModalController } from '@ionic/angular';
import { AddTicketComponent } from 'src/app/components/Ticket/add-ticket/add-ticket.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.scss']
})
export class AccountComponent {

    public userSub: Subscription;
    public Tickets: Ticket[];
    public Refresher: Subject<object>;

    constructor(public auth: AuthService, public loading: LoadingService, public alertCtrl: AlertController, 
                public navCtrl: NavController, public modalCtrl: ModalController) {
        this.Refresher = new Subject<object>();
    }

    ionViewWillEnter() {
        this.Refresher.next(null);
    }

    GetTypeName(id: number) {
        return UserType[id];
    }

    async AddTicket() {
      const modal = await this.modalCtrl.create({
        component: AddTicketComponent
      });
      modal.onDidDismiss().then(res => {
        if(res.data != null && res.data === 1) this.Refresher.next();
      });
      modal.present();
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


    doRefresh(event) {
      this.Refresher.next();
      event.target.complete();
    }
}
