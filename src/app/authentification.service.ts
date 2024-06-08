import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  role?: string;
  id?: number;
  firstname?: string;
  lastname?: string;

  connexion() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const partieJwt = jwt.split('.');
      const jwtBodyBase64 = partieJwt[1];
      const jsonBody = window.atob(jwtBodyBase64);
      const body = JSON.parse(jsonBody);

      this.role = body.role;
      this.id = body.id;
      this.firstname = body.firstname;
      this.lastname = body.lastname;
    } else {
      this.role = undefined;
      this.id = undefined;
      this.firstname = undefined;
      this.lastname = undefined;
    }
  }

  deconnexion () {
    localStorage.removeItem('jwt');
    this.role = undefined;
    this.id = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
  }
}
