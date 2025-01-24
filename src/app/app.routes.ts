import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/global/components/menu-global/menu-global.component').then(
        (m) => m.MenuGlobalComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/global/components/index/index.component').then(
            (m) => m.IndexComponent
          ),
      },
      {
        path: 'medico/index',
        loadComponent: () =>
          import('./modules/medico/components/index/index.component').then(
            (m) => m.IndexComponent),
      },
      {
        path: 'paciente/index',
        loadComponent: () =>
          import('./modules/paciente/components/index/index.component').then(
            (m) => m.IndexComponent),
      },
    ],
  },

];