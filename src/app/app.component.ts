import { Component, OnInit } from '@angular/core';
import { HospitalService } from './services/hospital.service';
import { MedicoService } from './services/medico.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'adminPro';

  constructor(
    private usuarioService: UsuarioService,
    private medicoServices: MedicoService,
    private hospitalService: HospitalService
  ) {}
  ngOnInit(): void {
    this.usuarioService.graficaUsuarios();
    this.medicoServices.graficaMedicos();
    this.hospitalService.graficaHospital();
  }
}
