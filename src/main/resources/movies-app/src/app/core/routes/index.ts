import { Route } from '@angular/router';

import { HomeComponent } from 'src/app/components/app/home/home.component';
import { MoviesComponent } from 'src/app/components/app/movies/movies.component';

export const ROUTES: Array<Route> = [
   {
       path: 'home',
       component: HomeComponent,
   }, {
       path: '',
       pathMatch: 'full',
       redirectTo: '/home',
   }, {
       path: 'movies',
       component: MoviesComponent,
   }
];