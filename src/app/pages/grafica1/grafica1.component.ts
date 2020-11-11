import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  // public totalUsuarios = () => {
  //   this.usuarioService.cargarUsuarios(0).subscribe(({ total }) => {
  //     return total;
  //   });
  // };

  constructor(
    private usuarioService: UsuarioService,
    private medicoServices: MedicoService,
    private hospitalService: HospitalService
  ) {}
  ngOnInit(): void {
    console.log(this.usuarioService.totalUsuarios);
  }

  // TOTAL

  public labels1: string[] = ['Usuarios', 'Médicos', 'Hospitales'];
  public data1 = [
    [
      this.usuarioService.totalUsuarios,
      this.medicoServices.medicos,
      this.hospitalService.hospitales,
    ],
  ];

  // USUARIOS Vs MEDICOS
  public labels2: string[] = ['Usuarios', 'Médicos'];
  public data2 = [
    [this.usuarioService.totalUsuarios, this.medicoServices.medicos],
  ];
  // MEDICOS Vs HOSPITALES
  public labels3: string[] = ['Médicos', 'Hospitales'];
  public data3 = [
    [this.medicoServices.medicos, this.hospitalService.hospitales],
  ];
  // USUARIOS Vs MEDICOS
  public labels4: string[] = ['Usuarios', 'Hospitales'];
  public data4 = [
    [this.usuarioService.totalUsuarios, this.hospitalService.hospitales],
  ];
}
