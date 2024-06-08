import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Message} from "../models/Message.type";
import {AuthentificationService} from "../authentification.service";
import {NgClass} from "@angular/common";
import {MatInputModule} from '@angular/material/input';
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {environment} from "../../config";

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [NgClass, MatInputModule, MatButton, FormsModule, ReactiveFormsModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent {
  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  messages: Message[] = [];
  authentification: AuthentificationService = inject(AuthentificationService);
  ticketId: number = 0;

  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    text: ["", [Validators.required]],
  })

  ngOnInit() {
    this.onTicketDetailsDownload();
  }

  onTicketDetailsDownload() {
    this.route.params.subscribe(paramsUrl => {
      if (paramsUrl['id'] && !isNaN(paramsUrl['id'])) {
        this.ticketId = paramsUrl['id'];
        this.http.get<Message[]>(`${environment.apiBaseUrl}get-ticket-details/php?id=` + paramsUrl['id']).subscribe({
          next: data => {
            this.messages = data;
            this.ticketId = paramsUrl['id']
          },
          error: error => {
            this.snackBar.open("Le ticket introuvable", undefined, {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar', 'snackbar-error']
            });
            this.router.navigateByUrl('/');
          }
        })
      }
    })
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const formData = {...this.formulaire.value, ticket_id: this.ticketId};
      this.http.post(`${environment.apiBaseUrl}add-message.php`, formData).subscribe({
        next: (result) => {
          this.onTicketDetailsDownload();
          this.formulaire.reset();
          this.formulaire.get('text')?.setErrors(null);

          this.snackBar.open("Le message a bien ete ajoute", undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar', 'snackbar-success']
          });
        },
        error: error => {
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

  onResolve() {
    this.http.post(`${environment.apiBaseUrl}resolve.php`, {"ticket_id": this.ticketId}).subscribe({
      next: (result) => {
        this.onTicketDetailsDownload();
        this.snackBar.open("Le statut a bien été corrigé", undefined, {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar', 'snackbar-success']
        });
      },
      error: error => {
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
