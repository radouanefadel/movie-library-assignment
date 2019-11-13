import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { MovieService } from 'src/app/core/services/movie.service';
import { Movie } from 'src/app/core/models/movie';
import { MovieFlat } from 'src/app/core/models/movie-flat';

@Component({
  selector: 'mv-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit {

  private columns: Array<any> = [
    { name: 'title', title: 'Title' },
    { name: 'director', title: 'Director' },
    { name: 'releaseDate', title: 'Release date' },
    { name: 'type', title: 'Type' }
  ];
  private rows: Array<MovieFlat> = [];
  private tempData: Array<MovieFlat> = [];

  @ViewChild(DatatableComponent, {static: true })
  private datatable: DatatableComponent;

  constructor(private service: MovieService) { }
  
  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    let items: HTMLCollectionOf<Element> = document.getElementsByTagName('ngx-datatable');
    if (items.length) {
      setTimeout(() => {
        items[0].classList.add('body-height');
      }, 50);
    }
  }

  load(): void {
    let self = this;
    self.service.findAll().subscribe(data => {
      self.rows = data.map(movie => {
        return this.parse(movie);
      });
      self.tempData = self.rows;
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

  search($event: any): void {
    this.rows = this.tempData;
    let value: string = $event.target.value.toLowerCase().trim();
    if (!!value) {
      this.rows = this.tempData.filter(movie => {
        return movie.title.toLowerCase().indexOf(value) != -1
          || movie.director.toLowerCase().indexOf(value) != -1
          || movie.releaseDate.indexOf(value) != -1
          || movie.type.toLowerCase().indexOf(value) != -1
      });
    }
  }

}
