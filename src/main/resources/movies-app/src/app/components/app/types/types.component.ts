import { Component, OnInit } from '@angular/core';

import { Type } from 'src/app/core/models/type';
import { Movie } from 'src/app/core/models/movie';
import { TypeService } from 'src/app/core/services/type.service';

@Component({
  selector: 'mv-types',
  templateUrl: './types.component.html',
  styles: [
    '.list-group-item-action:hover { cursor: pointer !important; }',
    '.selected { background-color: #000 !important; color: #fff; }'
  ]
})
export class TypesComponent implements OnInit {

  private types: Array<Type>;
  private tempTypes: Array<Type>;
  private currentType: Type = null;
  private movies: Array<Movie> = [];
  private tempMovies: Array<Movie>;

  constructor(private service: TypeService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.findAll().subscribe(data => { this.types = this.tempTypes =  data; });
  }

  findMovies(type: Type) {
    this.currentType = type;
    this.service.findMovies(type.label).subscribe(data => { this.currentType.movies = this.movies = this.tempMovies = data.movies; });
  }

  search($event: any): void {
    this.types = this.tempTypes;
    let value: string = $event.target.value.toLowerCase().trim();
    if (!!value) {
      this.types = this.tempTypes.filter(type => {
        return type.label.toLowerCase().indexOf(value) != -1
      });
    }
  }

  searchMovies($event: any): void {
    this.movies = this.tempMovies;
    let value: string = $event.target.value.toLowerCase().trim();
    if (!!value) {
      this.movies = this.tempMovies.filter(movie => {
        return movie.title.toLowerCase().indexOf(value) != -1
          || movie.releaseDate.indexOf(value) != -1
          || movie.type.label.toLowerCase().indexOf(value) != -1
      });
    }
  }

  selected(type: Type): boolean {
    return !!this.currentType ? this.currentType.uuid === type.uuid : false;
  }

}
