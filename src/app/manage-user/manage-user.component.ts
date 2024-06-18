import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Utilisateur} from "../models/Utilisateur.type";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthentificationService} from "../authentification.service";
import {environment} from "../../config";

@Component({
  selector: 'app-manage-user',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {
  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  listeUtilisateurs: Utilisateur[] = [];
  authentification: AuthentificationService = inject(AuthentificationService);
  page: number = 0;
  nombrePage: number = 5;
  totalUtilisateurs: number = 0;

  ngOnInit() {
    this.onRechargeUtilisateur();
  }

  onPaginatorChange(e:PageEvent) {
    this.page = e.pageIndex;
    this.nombrePage = e.pageSize;

    this.onRechargeUtilisateur();
  }
  onRechargeUtilisateur() {
    this.http.get<any>(
      `${environment.apiBaseUrl}list-user.php?page=${this.page}&nombrePage=${this.nombrePage}`
    )
      .subscribe((resultat) => {
        this.listeUtilisateurs = resultat.utilisateurs;
        this.totalUtilisateurs = resultat.total;
      })
  }

  onSuppressionUtilisateur($utilisateurId: number) {

      this.http.delete(`${environment.apiBaseUrl}delete-user.php?id=` + $utilisateurId)
        .subscribe({
          next: (resultat) => {
            this.onRechargeUtilisateur();
            this.snackBar.open("L'utilisateur a bien ete supprime", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar', 'snackbar-success']
            });
          },
          error: (resultat) => {
            this.snackBar.open("L'erreur inconnue", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar', 'snackbar-error']
            });
          }
        })
  }
}
