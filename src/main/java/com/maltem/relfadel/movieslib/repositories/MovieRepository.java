package com.maltem.relfadel.movieslib.repositories;

import com.maltem.relfadel.movieslib.dto.MovieDto;
import com.maltem.relfadel.movieslib.dto.MovieFlatDto;
import com.maltem.relfadel.movieslib.util.MoviesIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class MovieRepository extends Storage<MovieDto> implements Repository<MovieDto> {

    @Autowired
    private MoviesIO moviesIO;

    @Autowired
    private DirectorRepository directorRepository;

    @Override
    public HashSet<MovieDto> findAll() {
        HashSet<MovieFlatDto> movies = this.moviesIO.read();
        this.records = movies.stream()
                .map(movieFlatDto -> MovieDto.parse(movieFlatDto))
                .collect(Collectors.toCollection(HashSet::new));
        return this.records;
    }

    @Override
    public MovieDto findOne(String uuid) {
        return this.findAll().stream()
                .filter(movie -> movie.getUuid().equals(uuid))
                .findFirst()
                .orElse(null);
    }

    public MovieDto findOneByTitle(String title) {
        return this.findAll().stream()
                .filter(movie -> movie.getTitle().equalsIgnoreCase(title))
                .findFirst()
                .orElse(null);
    }

    @Override
    public MovieDto save(MovieDto element) {
        MovieDto temp = this.findOneByTitle(element.getTitle());
        if (temp == null) {
            temp = element;
            temp.setUuid(null);
            System.out.println(temp.getDirector() + " " + temp.getType());
            System.out.println("BEFORE: \n=========");
            records.forEach(r -> System.out.println(String.format("%s: %s", r.getUuid(), r.getTitle())));
            this.records.add(temp);
            System.out.println("AFTER: \n=========");
            records.forEach(r -> System.out.println(String.format("%s: %s", r.getUuid(), r.getTitle())));
            this.export();
        }
        return temp;
    }

    @Override
    public MovieDto update(MovieDto element) {
        MovieDto movieDto = this.findOne(element.getUuid());
        if (movieDto != null) {
            movieDto.clone(element);
            this.records.add(movieDto);
            this.export();
        }
        return movieDto;
    }

    @Override
    public void delete(String uuid) {
        MovieDto movieDto = this.findOne(uuid);
        this.records.remove(movieDto);
        this.export();
    }

    private void export() {
        HashSet<MovieFlatDto> movies = this.records.stream()
                .map(movie -> MovieFlatDto.parse(movie))
                .collect(Collectors.toCollection(HashSet::new));
        moviesIO.write(movies);
    }
}
