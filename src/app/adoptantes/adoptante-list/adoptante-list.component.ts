import { Component, OnInit } from '@angular/core';
import { Adoptante } from '../models/adoptante.model';
import { AdoptanteService } from '../services/adoptante.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-adoptante-list',
  templateUrl: './adoptante-list.component.html',
  styleUrls: ['./adoptante-list.component.scss'],
})
export class AdoptanteListComponent implements OnInit {
  adoptantes: Adoptante[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  constructor(private adoptanteService: AdoptanteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.adoptanteService.listar().subscribe({
      next: (data) => {
        this.adoptantes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.cargando = false;
      },
    });
  }

  confirmarEliminar(adoptante: Adoptante): void {
    if (!confirm(`¿Eliminar al adoptante "${adoptante.nombre} ${adoptante.apellido}"?`)) {
      return;
    }
    this.eliminandoId = adoptante.id;
    this.adoptanteService.eliminar(adoptante.id).subscribe({
      next: () => {
        this.adoptantes = this.adoptantes.filter((a) => a.id !== adoptante.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
