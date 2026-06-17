import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialMedico } from '../models/historial-medico.model';
import { HistorialMedicoService } from '../services/historial-medico.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';
import { mensajeApiError } from '../../shared/utils/api-error.util';

@Component({
  selector: 'app-historial-list',
  templateUrl: './historial-list.component.html',
  styleUrls: ['./historial-list.component.scss'],
})
export class HistorialListComponent implements OnInit {
  registros: HistorialMedico[] = [];
  animales: Animal[] = [];
  cargando = true;
  error = '';
  eliminandoId: number | null = null;

  filtroAnimalId: number | null = null;

  constructor(
    private historialService: HistorialMedicoService,
    private animalService: AnimalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const animalIdParam = this.route.snapshot.queryParamMap.get('animalId');
    if (animalIdParam) {
      this.filtroAnimalId = +animalIdParam;
    }
    this.animalService.listar().subscribe({
      next: (data) => {
        this.animales = data;
      },
    });
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.historialService.listar(this.filtroAnimalId ?? undefined).subscribe({
      next: (data) => {
        this.registros = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 8080?';
        this.cargando = false;
      },
    });
  }

  aplicarFiltros(): void {
    this.cargar();
  }

  limpiarFiltros(): void {
    this.filtroAnimalId = null;
    this.cargar();
  }

  confirmarEliminar(registro: HistorialMedico): void {
    if (!confirm(`¿Eliminar el registro médico #${registro.id}?`)) {
      return;
    }
    this.eliminandoId = registro.id;
    this.historialService.eliminar(registro.id).subscribe({
      next: () => {
        this.registros = this.registros.filter((r) => r.id !== registro.id);
        this.eliminandoId = null;
      },
      error: (err) => {
        this.error = mensajeApiError(err);
        this.eliminandoId = null;
      },
    });
  }
}
