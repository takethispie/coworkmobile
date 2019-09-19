import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import {PipesModule} from '../../pipes/pipes-components.module';
import {WareComponentsModule} from '../../components/Ware/WareComponents.module';
import {TicketComponentsModule} from '../../components/Ticket/TicketComponents.module';
import {AccountComponentsModule} from '../../components/Account/account-components-module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule.forChild([{path: '', component: AccountComponent}]),
        WareComponentsModule,
        TicketComponentsModule,
        AccountComponentsModule,
    ],
    declarations: [AccountComponent]
})
export class AccountModule {}
