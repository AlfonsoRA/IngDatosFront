import { Component, OnInit } from '@angular/core';
import { capacidadRefugio, domicilioRefugio, Refugio } from '../models/refugio.model';
import { RefugioService } from '../services/refugio.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-refugio-list',
  templateUrl: './refugio-list.component.html',
  styleUrls: ['./refugio-list.component.scss'],
})
export class RefugioListComponent implements OnInit {
  refugios: Refugio[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  readonly domicilioRefugio = domicilioRefugio;
  readonly capacidadRefugio = capacidadRefugio;

  constructor(private refugioService: RefugioService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.refugioService.listar().subscribe({
      next: (data) => {
        this.refugios = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.cargando = false;
      },
    });
  }

  confirmarEliminar(refugio: Refugio): void {
    if (!confirm(`¿Eliminar el refugio "${refugio.nombre}"?`)) {
      return;
    }
    this.eliminandoId = refugio.id;
    this.refugioService.eliminar(refugio.id).subscribe({
      next: () => {
        this.refugios = this.refugios.filter((r) => r.id !== refugio.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
