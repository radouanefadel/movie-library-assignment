import { Component, OnInit } from '@angular/core';

import { Director } from 'src/app/core/models/director';
import { Movie } from 'src/app/core/models/movie';
import { DirectorsService } from 'src/app/core/services/directors.service';

@Component({
  selector: 'mv-directors',
  templateUrl: './directors.component.html',
  styles: [
    '.list-group-item-action:hover { cursor: pointer !important; }',
    '.selected { background-color: #000 !important; color: #fff; }'
  ]
})
export class DirectorsComponent implements OnInit {

  private directors: Array<Director>;
  private tempDirectors: Array<Director>;
  private currentDirector: Director = null;
  private movies: Array<Movie> = [];
  private tempMovies: Array<Movie>;

  constructor(private service: DirectorsService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.findAll().subscribe(data => { this.directors = this.tempDirectors =  data; });
  }

  findMovies(director: Director) {
    this.currentDirector = director;
    this.service.findMovies(director.fullName).subscribe(data => { this.currentDirector.movies = this.movies = this.tempMovies = data.movies; });
  }

  search($event: any): void {
    this.directors = this.tempDirectors;
    let value: string = $event.target.value.toLowerCase().trim();
    if (!!value) {
      this.directors = this.tempDirectors.filter(director => {
        return director.fullName.toLowerCase().indexOf(value) != -1
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

  selected(director: Director): boolean {
    return !!this.currentDirector ? this.currentDirector.uuid === director.uuid : false;
  }

}
