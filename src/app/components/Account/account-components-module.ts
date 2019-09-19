import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {PipesModule} from '../../pipes/pipes-components.module';
import {AccountStaffComponent} from './account-staff/account-staff.component';
import {FormsModule} from '@angular/forms';
import {TicketComponentsModule} from '../Ticket/TicketComponents.module';



@NgModule({
    declarations: [
        AccountStaffComponent,
    ],
    exports: [
        AccountStaffComponent,
    ],
    entryComponents: [
        AccountStaffComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        TicketComponentsModule,
    ]
})
export class AccountComponentsModule { }
