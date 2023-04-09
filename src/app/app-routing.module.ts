import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OthersComponent } from './components/others/others.component';
import { PeopleComponent } from './components/people/people.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';

export const routes: Routes = [
  {
    path: 'pico-preview',
    component: PicoPreviewComponent,
  },
  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'others',
    component: OthersComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
