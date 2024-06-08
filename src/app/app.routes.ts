import { Routes } from '@angular/router';
import {EditUserComponent} from "./edit-user/edit-user.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ManageUserComponent} from "./manage-user/manage-user.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {administrateurGuard} from "./administrateur.guard";
import {gestionnaireGuard} from "./gestionnaire.guard";
import {TicketDetailsComponent} from "./ticket-details/ticket-details.component";
import {NewTicketComponent} from "./new-ticket/new-ticket.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'manage-user', component: ManageUserComponent, canActivate: [gestionnaireGuard]},
  {path: 'add-user', component: EditUserComponent, canActivate: [administrateurGuard]},
  {path: 'edit-user/:id', component: EditUserComponent, canActivate: [administrateurGuard]},
  {path: 'ticket-details/:id', component: TicketDetailsComponent},
  {path: 'new-ticket', component: NewTicketComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];
