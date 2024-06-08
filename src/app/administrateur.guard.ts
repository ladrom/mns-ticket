import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthentificationService} from "./authentification.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export const administrateurGuard: CanActivateFn = (route, state) => {
  const authentification = inject(AuthentificationService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (authentification.role == 'Administrateur') {
    return true;
  } else {
    snackBar.open("Vous ne pouvez pas acceder a cette page", undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar', 'snackbar-error']
    });
    return router.createUrlTree(['/connexion']);
  }
};
