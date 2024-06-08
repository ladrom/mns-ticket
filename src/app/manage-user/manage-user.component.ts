import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Utilisateur} from "../models/Utilisateur.type";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
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

  ngOnInit() {
    this.onRechargeUtilisateur();


  }
  onRechargeUtilisateur() {
    this.http.get<Utilisateur[]>(
      `${environment.apiBaseUrl}list-user.php`
    )
      .subscribe((resultat) => {
        this.listeUtilisateurs = resultat;
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
