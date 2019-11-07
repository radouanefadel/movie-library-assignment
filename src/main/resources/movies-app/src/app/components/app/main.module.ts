import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MoviesComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  exports: [MainComponent, HomeComponent, MoviesComponent,]
})
export class MainModule { }
