import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale'
import { getFrenchDate } from 'src/app/core/utils/functions';
import { MovieService } from 'src/app/core/services/movie.service';
import { MovieFlat } from 'src/app/core/models/movie-flat';


@Component({
  selector: 'mv-add-movie',
  templateUrl: './add-movie.component.html',
  styles: []
})
export class AddMovieComponent implements OnInit {

  private locale: string = "fr";
  private modalRef: BsModalRef;
  private bsConfig: Partial<BsDatepickerConfig>;
  private config: ModalOptions = {
    backdrop: 'static',
    ignoreBackdropClick: false,
  };

  private formGroup: FormGroup;

  alerts: any[] = [{
    type: 'success',
    msg: 'Movie has been added successfully',
    timeout: 2500
  }, {
    type: 'danger',
    msg: 'Unknown error.',
    timeout: 2500
  }];

  private alert: any = {}


  constructor(
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private httpService: MovieService
  ) {}

  ngOnInit() {
    this.initValidator();
    this.initPicker();
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  initPicker(): void {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-default' });
    defineLocale(this.locale, frLocale);
    this.localeService.use(this.locale);
  }
  
  initValidator(): void {
    const sharedValidators: ValidatorFn[] = [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
      Validators.pattern(/\w+$/)
    ];
    this.formGroup = new FormGroup({
      Title: new FormControl('', [ ...sharedValidators ]),
      DirectorFullName: new FormControl('', [...sharedValidators ]),
      ReleaseDate: new FormControl('', [ Validators.required ]),
      TypeLabel: new FormControl('', [...sharedValidators ])
    });
  }

  getPayload(formGroup: FormGroup): MovieFlat {
    const controls = formGroup.controls;
    return {
      title: controls.Title.value,
      director: controls.DirectorFullName.value,
      releaseDate: getFrenchDate(controls.ReleaseDate.value),
      type: controls.TypeLabel.value
    };
  }

  submit() {
    let self = this;
    const payload: MovieFlat = self.getPayload(self.formGroup);
    self.httpService.save(payload).subscribe(
      data => {
        if (!!data) {
          self.reset();
          self.alert = self.alerts.find(a => a.type === 'success');
        }
      },
      error => self.alert = self.alerts.find(a => a.type === 'danger'),
      () => alert(self.alert.msg)
    );
  }
 
  reset() {
    this.formGroup.reset();
  }
}
