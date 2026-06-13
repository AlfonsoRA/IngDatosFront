# PatitasUnidas — Frontend (Angular 15)

UI del proyecto. Consume la API de **`../Back`** (puerto **8080**).

## Requisitos

- **Node.js** 18 LTS o 20 LTS  
- **npm** 9+

## Ejecutar (recomendado)

**Primero** levantá el backend (`Back\run-dev.ps1`). Luego:

```powershell
cd Front
.\run-dev.ps1
```

O manualmente:

```powershell
npm install
npm start
```

Abrir http://localhost:4200

## IntelliJ IDEA / WebStorm

1. **File → Open** → carpeta `Front`.
2. Run (▶): **ng serve** (configuración por defecto; ejecuta `npm start` con proxy al Back).
3. Primera vez: ejecutá **npm install** desde Run o terminal.

Configuraciones en `.idea/runConfigurations/`:

| Nombre | Uso |
|--------|-----|
| **ng serve** | Frontend en http://localhost:4200 |
| **npm install** | Instalar dependencias |

**Importante:** levantá antes el Back (**PatitasUnidas API**) en otra ventana de IntelliJ o con `Back\run-dev.ps1`.

## Conexión con el backend

| Archivo | Rol |
|---------|-----|
| `proxy.conf.json` | En dev, reenvía `/api` → `http://localhost:8080` |
| `src/environments/environment.ts` | `apiUrl: '/api'` |

## Módulos UI (alineados al DER / Back)

| Ruta | Módulo | API |
|------|--------|-----|
| `/` | Inicio + accesos rápidos | — |
| `/refugios` | ABM Refugios (dirección, capacidad) | `/api/refugios` |
| `/animales` | ABM Animales | `/api/animales` |
| `/historial-medico` | ABM Historial médico | `/api/historial-medico` |
| `/ubicaciones-animal` | Historial de ubicaciones (lectura) | `/api/ubicaciones-animal` |
| `/adoptantes` | ABM Adoptantes | `/api/adoptantes` |
| `/adopciones` | ABM Adopciones | `/api/adopciones` |
| `/etapas-adopcion` | ABM Etapas de adopción | `/api/etapas-adopcion` |
| `/hogares-transito` | ABM Hogares de tránsito | `/api/hogares-transito` |
| `/transitos` | ABM Tránsitos | `/api/transitos` |
| `/reportes` | Dashboard (vistas SQL) | `/api/reportes/*` |

Desde el listado de **Animales**, los botones 💉 y 📍 filtran historial y ubicaciones por animal.

Si el listado muestra error de conexión, verificá que el Back esté en el puerto 8080.

## Si falla `npm start`

1. **`ng` no se reconoce** → Ejecutá desde la carpeta `Front` después de `npm install`.
2. **Errores de dependencias** → Borrá `node_modules`, ejecutá `npm install` de nuevo.
3. **Puerto 4200 ocupado** → `npx ng serve --port 4201` y agregá `http://localhost:4201` en `Back\application.properties` (`app.cors.allowed-origins`).
