// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

// SERVICIOS
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { MedicoService } from '../../../services/medico.service';

// MODELOS
import { Medico } from 'src/app/models/medico.model';

// EXTERNOS
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private modalImagenServices: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenServices.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedicos());
  }
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.busquedasService.buscar('medicos', termino).subscribe((resultados) => {
      this.medicos = resultados;
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenServices.abrirModal('medicos', medico._id, medico.img);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta apunto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id).subscribe((resp) => {
          this.cargarMedicos();
          Swal.fire(
            'Médico borrado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
