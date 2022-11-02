import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { AuthResponde, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url_base: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(
    private http: HttpClient
  ) { }

  login(data: any[]) {
    const url = `${this.url_base}/auth/`;
    return this.http.post<AuthResponde>(url, data)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              nombre: resp.user.nombre,
              id: resp.user.id_usuario,
              email: resp.user.email
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  validarToken() {
    const url = `${this.url_base}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponde>(url, { headers })
      .pipe(
        map((resp) => {
          localStorage.setItem('token', resp.token!);
          this._usuario = {
            nombre: resp.user.nombre,
            id: resp.user.id_usuario,
            email: resp.user.email
          }

          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  crearUsuario(data: any) {
    const url = `${this.url_base}/auth/new`;
    return this.http.post<AuthResponde>(url, data)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this._usuario = {
              nombre: resp.user.nombre,
              id: resp.user.id_usuario,
              email: resp.user.email
            }
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error))
      )
  }

  logout() {
    localStorage.removeItem('token');
  }
}
