import { Component, OnInit } from '@angular/core';

import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { MovieFlat } from 'src/app/core/models/movie-flat';
import { FILTERS } from './filters';
import { parse } from 'src/app/core/utils/functions';

@Component({
  selector: 'mv-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  private filters: Array<any> = FILTERS;

  private movies: Array<MovieFlat> = [];
  private tempData: Array<MovieFlat> = [];
  private currentMovie: MovieFlat;

  constructor(private service: MovieService) { }
  
  ngOnInit() {
    this.load();
  }

  load(): void {
    let self = this;
    self.service.findAll().subscribe(data => {
      self.movies = data.map(movie => {
        return this.parse(movie);
      });
      self.tempData = self.movies;
    });

  }

  parse(movie: Movie): MovieFlat {
    return {
      uuid: movie.uuid,
      title: movie.title,
      releaseDate: movie.releaseDate,
      director: movie.director.fullName,
      type: movie.type.label
    }
  }

  update(movie: MovieFlat) {
    this.currentMovie = movie;
  }

  delete(movie: MovieFlat): void {
    let rep = confirm(`Are you sure want to delete the movie: ${movie.title}?`);
    if (!!rep) {
      this.service.delete(movie.uuid).subscribe(
        data => alert('Movie deleted successfully'),
        err => alert('Unknown error!')
      );
    }
  }

  search($event: any): void {
    this.movies = this.tempData;
    let value: string = $event.target.value.toLowerCase().trim();
    if (!!value) {
      this.movies = this.tempData.filter(movie => {
        return movie.title.toLowerCase().indexOf(value) != -1
          || movie.director.toLowerCase().indexOf(value) != -1
          || movie.releaseDate.indexOf(value) != -1
          || movie.type.toLowerCase().indexOf(value) != -1
      });
    }
  }

  sort(filterName: string): void {
    if (filterName != 'releaseDate') {
      const index = this.filters.findIndex(f => f.column === filterName);
      const desc = this.filters[index].desc;
      this.movies = this.movies.sort((m1: MovieFlat, m2: MovieFlat) => {
        const val1 = m1[filterName].toLowerCase();
        const val2 = m2[filterName].toLowerCase();
        const result = val1.localeCompare(val2);
        return !desc ? result : result * -1;
      });
      this.filters[index].desc = !desc;
    } else {
      this.sortByDate();
    }
  }

  sortByDate(): void {
    this.movies = this.movies.sort((m1: MovieFlat, m2: MovieFlat) => {
      const date1: Date = parse(m1.releaseDate);
      const date2: Date = parse(m2.releaseDate);
      let result: number = +date1 === + date2 ? 0 : (
        +date1 > +date2 ? 1 : -1
      );
      return !this.filters[2].desc ? result : result * -1;
    });
    this.filters[2].desc = !this.filters[2].desc;
  }

  updateHandler($event) {
    this.currentMovie = null;
    this.load();
  }

}
