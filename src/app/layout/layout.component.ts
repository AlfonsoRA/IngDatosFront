import { Component } from '@angular/core';

export interface MenuItem {
  label: string;
  route: string;
  icon: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/', icon: '🏠' },
    { label: 'Refugios', route: '/refugios', icon: '🏡' },
    { label: 'Animales', route: '/animales', icon: '🐾' },
    { label: 'Historial médico', route: '/historial-medico', icon: '💉' },
    { label: 'Ubicaciones', route: '/ubicaciones-animal', icon: '📍' },
    { label: 'Adopciones', route: '/adopciones', icon: '❤️' },
    { label: 'Adoptantes', route: '/adoptantes', icon: '👤' },
    { label: 'Etapas adopción', route: '/etapas-adopcion', icon: '📋' },
    { label: 'Hogares tránsito', route: '/hogares-transito', icon: '🛏️' },
    { label: 'Tránsitos', route: '/transitos', icon: '🔄' },
    { label: 'Reportes', route: '/reportes', icon: '📊' },
  ];
}
