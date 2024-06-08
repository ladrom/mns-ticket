import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthentificationService} from "./authentification.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mnsloc-angular';
  jwt: string | null = null;
  snackbar: MatSnackBar = inject(MatSnackBar);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  ngOnInit() {
    this.authentification.connexion();
  }
  onLogout() {
    this.authentification.deconnexion();
    this.snackbar.open(
      "Vous avez terminé votre séance", undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar', 'snackbar-success']
      }
    )
    this.router.navigateByUrl('/connexion');
  }
}
