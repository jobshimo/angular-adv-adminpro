// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// COMPONENTS
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';

// EXTERNOS
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImagenComponent],

  exports: [IncrementadorComponent, DonaComponent, ModalImagenComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
})
export class ComponentsModule {}
