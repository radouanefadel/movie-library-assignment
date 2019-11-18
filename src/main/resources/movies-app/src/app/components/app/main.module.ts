import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule, BsDatepickerModule, AlertModule } from 'ngx-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { COMPONENTS as LayoutComponents } from '../layouts';
import { MoviesComponents } from './movies';
import { DirectorsComponents } from './directors';
import { TypesComponents } from './types';
import { ErrorsComponents } from './errors';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ...LayoutComponents,
    ...MoviesComponents,
    ...DirectorsComponents,
    ...TypesComponents,
    ...ErrorsComponents,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // #region (ngx-bootstrap)
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // #endRegion (ngx-bootstrap)
    NgxDatatableModule,
    NgBootstrapFormValidationModule.forRoot()
  ],
  exports: [MainComponent,]
})
export class MainModule { }
