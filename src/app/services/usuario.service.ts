// ANGULAR
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// RXJS
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// INTERFACE
import { RegisterForm } from '../interfaces/register-form.interfaces';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuarios } from '../interfaces/cargar-usuarios.interface';

// MODELOS
import { Usuario } from '../models/usuario.model';

// ENTORNOS
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

// DECLARACIONES
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  googleInit() {
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '466982579575-pf1nmmrkeahnrt3vmsqaksqpimonpahe.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res: any) => {
          const { email, google, nombre, role, img = '', uid } = res.usuarioDB;
          this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
          this.guardarLocalStorage(res.token, res.menu);
          return true;
        }),
        catchError((err) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((res: any) => {
        this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  actualizarPerfil(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role,
    };

    return this.http.put(
      `${base_url}/usuarios/${this.uid}`,
      data,
      this.headers
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((res: any) => {
        this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        this.guardarLocalStorage(res.token, res.menu);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuarios>(url, this.headers).pipe(
      map((resp) => {
        const usuarios = resp.usuarios.map(
          (user) =>
            new Usuario(
              user.nombre,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );

        return {
          total: resp.total,
          usuarios,
        };
      })
    );
  }

  eliminarUsuario(usuario: Usuario) {
    // /usuarios/5f8329bacbbe256b305c0d8e
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.put(
      `${base_url}/usuarios/${usuario.uid}`,
      usuario,
      this.headers
    );
  }
}
