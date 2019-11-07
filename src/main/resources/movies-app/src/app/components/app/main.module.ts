import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MainRoutingModule } from './main-routing.module';
import { COMPONENTS as LayoutComponents } from '../layouts';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MoviesComponent,
    ...LayoutComponents,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  exports: [MainComponent,]
})
export class MainModule { }
