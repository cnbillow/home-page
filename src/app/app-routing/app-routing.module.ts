import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { clientRoutes } from './routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(clientRoutes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
