// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { map } from 'rxjs/operators';

// MODELOS
import { Hospital } from '../models/hospital.model';

// ENTORNOS
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  public hospitales: number;
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  graficaHospital() {
    this.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales.length;
    });
  }

  cargarHospitales() {
    const url = `${base_url}/hospitales`;
    return this.http
      .get(url, this.headers)
      .pipe(
        map((resp: { ok: boolean; hospitales: Hospital[] }) => resp.hospitales)
      );
  }

  crearHospitales(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }

  actualizarHospitales(_id: string, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }
  borrarHospitales(_id: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
