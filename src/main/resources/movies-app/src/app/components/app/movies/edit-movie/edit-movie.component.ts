import { Component, OnInit, TemplateRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { BsModalService, BsModalRef, ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale'
import { getFrenchDate, parse } from 'src/app/core/utils/functions';
import { MovieService } from 'src/app/core/services/movie.service';
import { MovieFlat } from 'src/app/core/models/movie-flat';


@Component({
  selector: 'mv-edit-movie',
  templateUrl: './edit-movie.component.html',
  styles: []
})
export class EditMovieComponent implements OnInit {

  private locale: string = "fr";
  private modalRef: BsModalRef;

  @ViewChild(ModalDirective, { static: false })
  private modal: ModalDirective;

  @Output('movie-updated')
  private movieEventEmitter: EventEmitter<MovieFlat> = new EventEmitter();;
  
  private bsConfig: Partial<BsDatepickerConfig>;
  private config: ModalOptions = {
    backdrop: 'static',
    ignoreBackdropClick: false,
  };

  private formGroup: FormGroup;

  alerts: any[] = [{
    type: 'success',
    msg: 'Movie has been updated successfully',
  }, {
    type: 'danger',
    msg: 'Unknown error.',
  }];

  private movie: MovieFlat;

  @Input('movie')
  set _movie(val: MovieFlat) {
    if (!!val) {
      this.movie = val;
      const btn: HTMLElement = document.getElementById('update-movie');
      if (!!btn) {
        btn.click();
      }
    }
  }

  private alert: any = null;


  constructor(
    private modalService: BsModalService,
    private localeService: BsLocaleService,
    private httpService: MovieService
  ) {}

  ngOnInit() {
    this.initValidator();
    this.initPicker();
    this.setValues();
  }
 
  openModal(template: TemplateRef<any>) {
    let self = this;
    self.modalRef = self.modalService.show(template, self.config);
    self.modalService.onHidden.subscribe($e => this.movieEventEmitter.emit(null));
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

  setValues() {
    if (!!this.movie) {
      let controls = this.formGroup.controls;
      controls.Title.patchValue(this.movie.title)
      controls.DirectorFullName.patchValue(this.movie.director)
      controls.ReleaseDate.patchValue(parse(this.movie.releaseDate))
      controls.TypeLabel.patchValue(this.movie.type)
    }
  }

  getPayload(formGroup: FormGroup): MovieFlat {
    const controls = formGroup.controls;
    return {
      uuid: this.movie.uuid,
      title: controls.Title.value,
      director: controls.DirectorFullName.value,
      releaseDate: getFrenchDate(controls.ReleaseDate.value),
      type: controls.TypeLabel.value
    };
  }

  submit() {
    let self = this;
    const payload: MovieFlat = self.getPayload(self.formGroup);
    self.httpService.update(payload).subscribe(
      data => {
        if (!!data) {
          self.reset();
          self.alert = self.alerts.find(alert => alert.type === 'success');
        }
      },
      error => self.alert = self.alerts.find(a => a.type === 'danger'),
      () => alert(this.alert.msg)
    );
  }
 
  reset() {
    this.formGroup.reset();
  }


}
