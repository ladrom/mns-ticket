import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthentificationService} from "../authentification.service";
import {environment} from "../../config";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.scss'
})
export class NewTicketComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    ticket_title: ["", [Validators.required]],
    ticket_text: ["", [Validators.required]],
  })
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar)
  authentification: AuthentificationService = inject(AuthentificationService);

  onSubmit() {
    if (this.formulaire.valid) {
      this.http.post(`${environment.apiBaseUrl}new-ticket.php`, this.formulaire.value).subscribe({
        next: (result) => {
          this.router.navigateByUrl('/');
          this.snackBar.open("Le ticket a bien été ajouté", undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar', 'snackbar-success']
          });
        },
        error: err => {
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

}
