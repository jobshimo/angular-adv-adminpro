// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// RXJS
import { delay } from 'rxjs/operators';

// SERVICIOS
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';

// MODELOS
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';

// EXTERNOS
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;
  private imgSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalImagenServices: ModalImagenService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: [
        { value: '', disabled: this.usuarioService.role !== 'ADMIN_ROLE' },
        Validators.required,
      ],
      hospital: [
        { value: '', disabled: this.usuarioService.role !== 'ADMIN_ROLE' },
        Validators.required,
      ],
    });
    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalId) => {
      if (hospitalId === '') {
        this.hospitalSeleccionado = null;
      } else {
        this.hospitalSeleccionado = this.hospitales.find(
          (h) => h._id === hospitalId
        );
      }
    });

    this.imgSubs = this.modalImagenServices.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarMedico(this.medicoSeleccionado._id));
  }

  abrirModal(medico: Medico) {
    if (this.usuarioService.role !== 'ADMIN_ROLE') {
      Swal.fire('Error', 'No tiene privilegios para hacer eso', 'error');
      return;
    } else {
      this.modalImagenServices.abrirModal('medicos', medico._id, medico.img);
    }
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.medicoService
      .getMedicoById(id)
      .pipe(delay(100))
      .subscribe((medico) => {
        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        if (!medico.hospital) {
          const { nombre } = medico;

          this.medicoForm.setValue({ nombre, hospital: '' });
        } else {
          const {
            nombre,
            hospital: { _id },
          } = medico;
          this.medicoForm.setValue({ nombre, hospital: _id });
        }

        this.medicoSeleccionado = medico;
      });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    if (this.usuarioService.role !== 'ADMIN_ROLE') {
      Swal.fire('Error', 'No tiene privilegios para hacer eso', 'error');
      return;
    } else {
      const { nombre } = this.medicoForm.value;

      if (this.medicoSeleccionado) {
        const data = {
          ...this.medicoForm.value,
          _id: this.medicoSeleccionado._id,
        };

        this.medicoService.actualizarMedico(data).subscribe((resp) => {
          console.log(resp);

          Swal.fire(
            'Actualizado',
            `${nombre} actualizado correctamente`,
            'success'
          );
        });
        // actualizar
      } else {
        this.medicoService
          .crearMedico(this.medicoForm.value)
          .subscribe((resp: any) => {
            Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
          });
      }
    }
  }
}
