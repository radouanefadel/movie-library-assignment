import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { COMPONENTS as LayoutComponents } from '../layouts';
import { MoviesComponents } from './movies';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ...LayoutComponents,
    ...MoviesComponents,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxDatatableModule,
    NgBootstrapFormValidationModule.forRoot()
  ],
  exports: [MainComponent,]
})
export class MainModule { }
