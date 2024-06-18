import {Component, inject} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import {HttpClient} from "@angular/common/http";
import {Ticket} from "../models/Ticket.type";
import {MatTableModule} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../config";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


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
    MatAnchor,
    MatProgressSpinner
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
  page: number = 0;
  nombrePage: number = 5;
  totalTickets: number = 0;
  hasSpinner: boolean = false;

  ngOnInit() {
    this.onRechargeTickets();
  }

  onPaginatorChange(e:PageEvent) {
    this.page = e.pageIndex;
    this.nombrePage = e.pageSize;

    this.onRechargeTickets();
  }

  onRechargeTickets() {
    this.hasSpinner = true;
    this.http.get<any>(`${environment.apiBaseUrl}get-tickets.php?page=${this.page}&nombrePage=${this.nombrePage}`).subscribe({
      next: data => {
        this.tickets = data.tickets;
        this.totalTickets = data.totalTickets;
        this.ticketsNotResolved = data.totalTicketsPasResolu;
        this.hasSpinner = false;
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
