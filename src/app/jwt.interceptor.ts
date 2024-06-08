import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    const nouvelleRequete = req.clone({
      setHeaders: {Authorization: jwt}
    })

    return next(nouvelleRequete);
  }
  throw Error("Vous utilisez le service http client globale, il faut donc qu'il y ai un jwt dans le localstorage");
};
