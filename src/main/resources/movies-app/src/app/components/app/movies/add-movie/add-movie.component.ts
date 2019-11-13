import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale'
import { convertDate } from 'src/app/core/utils/functions';
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

  private formGroup: FormGroup;

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
    this.modalRef = this.modalService.show(template);
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
      releaseDate: convertDate(controls.ReleaseDate.value),
      type: controls.TypeLabel.value
    };
  }

  submit() {
    const payload: MovieFlat = this.getPayload(this.formGroup);
    this.httpService.save(payload).subscribe(data => {
      console.log(data);
    })
  }
 
  reset() {
    this.formGroup.reset();
  }

}
