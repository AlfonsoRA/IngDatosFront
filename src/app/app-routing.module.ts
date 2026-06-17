import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { RefugioListComponent } from './refugios/refugio-list/refugio-list.component';
import { RefugioFormComponent } from './refugios/refugio-form/refugio-form.component';
import { AnimalListComponent } from './animales/animal-list/animal-list.component';
import { AnimalFormComponent } from './animales/animal-form/animal-form.component';
import { AdoptanteListComponent } from './adoptantes/adoptante-list/adoptante-list.component';
import { AdoptanteFormComponent } from './adoptantes/adoptante-form/adoptante-form.component';
import { AdopcionListComponent } from './adopciones/adopcion-list/adopcion-list.component';
import { AdopcionFormComponent } from './adopciones/adopcion-form/adopcion-form.component';
import { EtapaListComponent } from './etapas-adopcion/etapa-list/etapa-list.component';
import { EtapaFormComponent } from './etapas-adopcion/etapa-form/etapa-form.component';
import { HogarListComponent } from './hogares-transito/hogar-list/hogar-list.component';
import { HogarFormComponent } from './hogares-transito/hogar-form/hogar-form.component';
import { TransitoListComponent } from './transitos/transito-list/transito-list.component';
import { TransitoFormComponent } from './transitos/transito-form/transito-form.component';
import { HistorialListComponent } from './historial-medico/historial-list/historial-list.component';
import { HistorialFormComponent } from './historial-medico/historial-form/historial-form.component';
import { UbicacionListComponent } from './ubicaciones-animal/ubicacion-list/ubicacion-list.component';
import { ReportesDashboardComponent } from './reportes/reportes-dashboard/reportes-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'refugios', component: RefugioListComponent },
      { path: 'refugios/nuevo', component: RefugioFormComponent },
      { path: 'refugios/editar/:id', component: RefugioFormComponent },
      { path: 'animales', component: AnimalListComponent },
      { path: 'animales/nuevo', component: AnimalFormComponent },
      { path: 'animales/editar/:id', component: AnimalFormComponent },
      { path: 'adoptantes', component: AdoptanteListComponent },
      { path: 'adoptantes/nuevo', component: AdoptanteFormComponent },
      { path: 'adoptantes/editar/:id', component: AdoptanteFormComponent },
      { path: 'adopciones', component: AdopcionListComponent },
      { path: 'adopciones/nuevo', component: AdopcionFormComponent },
      { path: 'adopciones/editar/:id', component: AdopcionFormComponent },
      { path: 'etapas-adopcion', component: EtapaListComponent },
      { path: 'etapas-adopcion/nuevo', component: EtapaFormComponent },
      { path: 'etapas-adopcion/editar/:id', component: EtapaFormComponent },
      { path: 'hogares-transito', component: HogarListComponent },
      { path: 'hogares-transito/nuevo', component: HogarFormComponent },
      { path: 'hogares-transito/editar/:id', component: HogarFormComponent },
      { path: 'transitos', component: TransitoListComponent },
      { path: 'transitos/nuevo', component: TransitoFormComponent },
      { path: 'transitos/editar/:id', component: TransitoFormComponent },
      { path: 'historial-medico', component: HistorialListComponent },
      { path: 'historial-medico/nuevo', component: HistorialFormComponent },
      { path: 'historial-medico/editar/:id', component: HistorialFormComponent },
      { path: 'ubicaciones-animal', component: UbicacionListComponent },
      { path: 'reportes', component: ReportesDashboardComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
