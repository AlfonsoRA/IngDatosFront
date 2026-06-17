import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UbicacionAnimal } from '../models/ubicacion-animal.model';
import { UbicacionAnimalService } from '../services/ubicacion-animal.service';
import { Animal } from '../../animales/models/animal.model';
import { AnimalService } from '../../animales/services/animal.service';

@Component({
  selector: 'app-ubicacion-list',
  templateUrl: './ubicacion-list.component.html',
  styleUrls: ['./ubicacion-list.component.scss'],
})
export class UbicacionListComponent implements OnInit {
  ubicaciones: UbicacionAnimal[] = [];
  animales: Animal[] = [];
  cargando = true;
  error = '';

  filtroAnimalId: number | null = null;

  constructor(
    private ubicacionService: UbicacionAnimalService,
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
    this.ubicacionService.listar(this.filtroAnimalId ?? undefined).subscribe({
      next: (data) => {
        this.ubicaciones = data;
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
}
