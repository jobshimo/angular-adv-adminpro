// ANGULAR
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  public menu = [];

  constructor(private usuarioService: UsuarioService) {}

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    // setTimeout(() => {
    //   if (this.menu.length === 0) {
    //     this.usuarioService.logout();
    //   }
    // }, 500);
  }

  // ESTE ES EL MENU PERO AHORA ESTA CENTRALIZADO EN EL BACKEND
  // menu: any[] = [
  //   {
  //     title: 'Dashboard!!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'ProgressBar', url: 'progress' },
  //       { title: 'Grafica', url: 'grafica1' },
  //       { title: 'Promesas', url: 'promesas' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: 'usuarios' },
  //       { title: 'Hospitales', url: 'hospitales' },
  //       { title: 'Médicos', url: 'medicos' },
  //     ],
  //   },
  // ];
}
