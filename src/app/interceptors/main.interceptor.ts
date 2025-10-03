import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.token;

  let newHeaders: { [name: string]: string | string[] } = {
    'Content-Type': 'application/json'
  };

  if (authToken !== undefined) {
    newHeaders['Authorization'] = `Bearer ${authToken}`;
  }
  console.log('asdads')
  const newReq = req.clone({
    setHeaders: newHeaders
  });

  return next(newReq);
};
