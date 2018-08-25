import { Routes } from '@angular/router';

import { HomeComponent } from '@pages/home/home.component';
import { BlogListComponent } from '@pages/blog-list/blog-list.component';
import { BlogDetailComponent } from '@pages/blog-detail/blog-detail.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';

import { AdminComponent } from '@pages/admin/admin.component';
import { BlogManagementComponent } from '@pages/admin/blog-management/blog-management.component';

import { AdminAuthService } from '@services/admin-auth.service';

export const clientRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 根路径默认跳转至 home

  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:blogId', component: BlogDetailComponent },

  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

export const adminRoutes: Routes = [
  { 
    path: 'admin', component: AdminComponent, canActivate: [AdminAuthService], children: [

      { path: 'blog', component: BlogManagementComponent }
    ]
  }
];