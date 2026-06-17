import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AdoptanteListComponent } from '../adoptantes/adoptante-list/adoptante-list.component';
import { AdoptanteFormComponent } from '../adoptantes/adoptante-form/adoptante-form.component';
import { AdopcionListComponent } from '../adopciones/adopcion-list/adopcion-list.component';
import { AdopcionFormComponent } from '../adopciones/adopcion-form/adopcion-form.component';
import { EtapaListComponent } from '../etapas-adopcion/etapa-list/etapa-list.component';
import { EtapaFormComponent } from '../etapas-adopcion/etapa-form/etapa-form.component';
import { HogarListComponent } from '../hogares-transito/hogar-list/hogar-list.component';
import { HogarFormComponent } from '../hogares-transito/hogar-form/hogar-form.component';
import { TransitoListComponent } from '../transitos/transito-list/transito-list.component';
import { TransitoFormComponent } from '../transitos/transito-form/transito-form.component';
import { HistorialListComponent } from '../historial-medico/historial-list/historial-list.component';
import { HistorialFormComponent } from '../historial-medico/historial-form/historial-form.component';
import { UbicacionListComponent } from '../ubicaciones-animal/ubicacion-list/ubicacion-list.component';
import { ReportesDashboardComponent } from '../reportes/reportes-dashboard/reportes-dashboard.component';

@NgModule({
  declarations: [
    AdoptanteListComponent,
    AdoptanteFormComponent,
    AdopcionListComponent,
    AdopcionFormComponent,
    EtapaListComponent,
    EtapaFormComponent,
    HogarListComponent,
    HogarFormComponent,
    TransitoListComponent,
    TransitoFormComponent,
    HistorialListComponent,
    HistorialFormComponent,
    UbicacionListComponent,
    ReportesDashboardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, SharedModule],
  exports: [
    AdoptanteListComponent,
    AdoptanteFormComponent,
    AdopcionListComponent,
    AdopcionFormComponent,
    EtapaListComponent,
    EtapaFormComponent,
    HogarListComponent,
    HogarFormComponent,
    TransitoListComponent,
    TransitoFormComponent,
    HistorialListComponent,
    HistorialFormComponent,
    UbicacionListComponent,
    ReportesDashboardComponent,
  ],
})
export class GestionModule {}
