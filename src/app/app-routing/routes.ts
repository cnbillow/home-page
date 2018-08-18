import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { BlogListComponent } from '@pages/blog-list/blog-list.component';

export const clientRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 根路径默认跳转至 home

  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogListComponent },
];