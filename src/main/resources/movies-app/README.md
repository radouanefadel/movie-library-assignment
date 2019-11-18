# Front-end application
Run application by using the following command line:
```console
ng serve
```
and go to [http://localhost:4200]()
## Pages
- [Home page](localhost:4200/home) `/home`;
- [Movies page](localhost:4200/movies) `/movies`;
- [Director page](localhost:4200/directors) `/directors`;
- [Type page](localhost:4200/types) `/types`;
- 404 page.
## Libraries & frameworks
- bootstrap 4;
- ngx-bootstrap;
- material-design icons;
- ng-bootstrap-form-validation;
## Project structure (Main elements)
+ **core**
    + **models**
        + [base-model.ts](src/app/core/models/base-model.ts);
        + [director.ts](src/app/core/models/director.ts);
        + [movie.ts](src/app/core/models/movie.ts);
        + [movie-flat.ts](src/app/core/models/movie-flat.ts);
        + [type.ts](src/app/core/models/type.ts);
    + **_routes_** [(Click here)](src/app/core/routes)
    + **services**
        + [directors.service.ts](src/app/core/services/directors.service.ts);
        + [movie.service.ts](src/app/core/services/movie.service.ts);
        + [type.service.ts](src/app/core/services/type.service.ts).
    + utils
        + URIs [(Click to see files)](src/app/core/utils/URIs);
        - [config.ts](src/app/core/utils/config.ts);
        - [functions.ts](src/app/core/utils/functions.ts);
        
+ **components**
    + **layouts** [click to see more](src/app/components/layouts): _Header & Footer_;
    + **app**
        + directors [(Click here to see more)](src/app/components/app/directors);
        + errors [(Click here to see more)](src/app/components/app/errors);
        + home [(Click here to see more)](src/app/components/app/home);
        + movies [(Click here to see more)](src/app/components/app/movies);
        + types [(Click here to see more)](src/app/components/app/types);
        - [main.component.html](src/app/components/app/main.component.html);
        - [main.component.ts](src/app/components/app/main.component.ts);
        - [main.module.ts](src/app/components/app/main.module.ts);;
        - [main-routing.module.ts](src/app/components/app/main-routing.module.ts);

## Data grid features
#### Sorting
The following code allows to sort movies by different filters:
>[movie.component.ts](src/app/components/app/movies/movies.component.ts)
```javascript
/** ... */

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

/** ... */
```
#### Search
Search a movie by title, director, release date or type:
>[movie.component.ts](src/app/components/app/movies/movies.component.ts)
```javascript
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
```
