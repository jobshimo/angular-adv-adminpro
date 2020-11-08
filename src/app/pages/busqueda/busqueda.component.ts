// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// SERVICES
import { BusquedasService } from 'src/app/services/busquedas.service';

// MODELOS
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  public usuarios: Usuario[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
      console.log(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.buscarGlobal(termino).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }

  abrirMedico(medico: Medico) {}
}
