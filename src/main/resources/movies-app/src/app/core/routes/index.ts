import { Route } from '@angular/router';

import { HomeComponent } from 'src/app/components/app/home/home.component';

export const ROUTES: Array<Route> = [
   {
       path: 'home',
       component: HomeComponent,
   }, {
       path: '',
       pathMatch: 'full',
       redirectTo: '/home',
   }
];