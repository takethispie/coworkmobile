import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from './user-logged-in.guard';
import { TicketComponent } from './Pages/ticket/ticket.component';
import { LoginPage } from './Pages/login/login.page';
import { AccountComponent } from './Pages/account/account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Account',
    pathMatch: 'full',
  },
  {
    path: 'Auth',
    component: LoginPage
  },
  {
    path: 'Account',
    component: AccountComponent,
    canActivate: [UserLoggedInGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
