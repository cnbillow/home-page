import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';

export const clientRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 根路径默认跳转至 home

  { path: 'home', component: HomeComponent },
];