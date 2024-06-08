import {Component, inject} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../models/Ticket.type";
import {MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../config";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIcon,
    MatMiniFabButton,
    MatPaginator,
    RouterLink,
    MatTableModule,
    MatButton,
    MatAnchor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authentification: AuthentificationService = inject(AuthentificationService);
  http: HttpClient = inject(HttpClient);
  tickets: Ticket[] = [];
  ticketsNotResolved: number = 0;
  router: Router = inject(Router);

  ngOnInit() {
    this.http.get<Ticket[]>(`${environment.apiBaseUrl}get-tickets.php`).subscribe({
      next: data => {
        this.tickets = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onTicketClick(row: number) {
    this.router.navigateByUrl(`/ticket-details/${row}` )
  }

  convertDateFormat(date: string) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  getunresolvedNums() {
    let counter = 0;
    this.tickets.forEach(ticket => {
      if (ticket.statut_id == 1) {
        counter++;
      }
    })
    return counter;
  }
}
