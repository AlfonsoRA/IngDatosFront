import { Component, OnInit } from '@angular/core';
import { HogarTransito } from '../models/hogar-transito.model';
import { HogarTransitoService } from '../services/hogar-transito.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-hogar-list',
  templateUrl: './hogar-list.component.html',
  styleUrls: ['./hogar-list.component.scss'],
})
export class HogarListComponent implements OnInit {
  hogares: HogarTransito[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  constructor(private hogarService: HogarTransitoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.hogarService.listar().subscribe({
      next: (data) => {
        this.hogares = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.cargando = false;
      },
    });
  }

  confirmarEliminar(hogar: HogarTransito): void {
    if (!confirm(`¿Eliminar el hogar de tránsito "${hogar.nombre} ${hogar.apellido}"?`)) {
      return;
    }
    this.eliminandoId = hogar.id;
    this.hogarService.eliminar(hogar.id).subscribe({
      next: () => {
        this.hogares = this.hogares.filter((h) => h.id !== hogar.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
