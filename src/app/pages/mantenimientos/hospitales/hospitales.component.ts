// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

// RXJS
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// SERVICIOS
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

// MODELOS
import { Hospital } from 'src/app/models/hospital.model';

// EXTERNOS
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private hospitalServices: HospitalService,
    private modalImagenServices: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarHospital();

    this.imgSubs = this.modalImagenServices.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarHospital());
  }

  cargarHospital() {
    this.cargando = true;

    this.hospitalServices.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalServices
      .actualizarHospitales(hospital._id, hospital.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }
  eliminarCambios(hospital: Hospital) {
    this.hospitalServices.borrarHospitales(hospital._id).subscribe((resp) => {
      this.cargarHospital();
      Swal.fire('Borrado', hospital.nombre, 'success');
    });
  }
  async abrirSwal() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalServices.crearHospitales(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenServices.abrirModal(
      'hospitales',
      hospital._id,
      hospital.img
    );
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.hospitales = this.hospitalesTemp);
    }
    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resultados) => {
        this.hospitales = resultados;
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
}
