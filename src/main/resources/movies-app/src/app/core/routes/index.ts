import { Route } from '@angular/router';

import { HomeComponent } from 'src/app/components/app/home/home.component';
import { MoviesComponent } from 'src/app/components/app/movies/movies.component';
import { DirectorsComponent } from 'src/app/components/app/directors/directors.component';
import { TypesComponent } from 'src/app/components/app/types/types.component';
import { NotFoundComponent } from 'src/app/components/app/errors/not-found/not-found.component';

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
   }, {
       path: 'directors',
       component: DirectorsComponent
   }, {
       path: 'types',
       component: TypesComponent
   }, {
       path: '**',
       component:NotFoundComponent
   }
];