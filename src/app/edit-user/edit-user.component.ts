import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Utilisateur} from "../models/Utilisateur.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../config";


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  listeRoles: string[] = ["Etudiant", "Gestionnaire", "Administrateur"];
  http: HttpClient = inject(HttpClient);
  snackBar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  idUtilisateur?: number;

  formBuilder: FormBuilder = inject(FormBuilder);
  formulaire: FormGroup = this.formBuilder.group({
    email: ["", []],
    password: ["", []],
    firstname: ["", []],
    lastname: ["", []],
    role: ["Etudiant", []]
  })

  ngOnInit() {
    this.route.params.subscribe(paramsUrl => {
      if (paramsUrl['id'] && !isNaN(paramsUrl['id']) ) {
        this.formulaire.get('password')?.removeValidators([Validators.required]);

        this.http
          .get<Utilisateur>(`${environment.apiBaseUrl}get-user.php?id=` + paramsUrl['id'])
          .subscribe({
            next: (user: Utilisateur) => {
              this.formulaire.patchValue(user);
              this.idUtilisateur = user.id;
            },
            error: (resultat) => {
              this.snackBar.open("L'utilisateur introuvable", undefined, {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['custom-snackbar', 'snackbar-error']
              });
              this.router.navigateByUrl('/manage-user');
            }
          })

      } else {
        this.formulaire = this.formBuilder.group({
          email: ["", [Validators.required, Validators.email]],
          password: ["", [Validators.required]],
          firstname: ["", [Validators.required]],
          lastname: ["", [Validators.required]],
          role: ["Etudiant", [Validators.required]]
        })
      }
    })
  }

  onSubmit() {
    if (this.formulaire.valid) {
      const url: string = this.idUtilisateur == null
        ? `${environment.apiBaseUrl}add-user.php`
        : `${environment.apiBaseUrl}edit-user.php?id=` + this.idUtilisateur;

      this.http.post(url, this.formulaire.value
      ).subscribe({
        next: (resultat) => {
          this.snackBar.open("L'utilisateur a bien ete ajoute", undefined, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar', 'snackbar-success']
          });
          this.router.navigateByUrl('/manage-user');
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
}
