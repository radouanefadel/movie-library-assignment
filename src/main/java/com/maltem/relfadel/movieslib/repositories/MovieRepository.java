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
        return movies.stream()
                .map(movieFlatDto -> MovieDto.parse(movieFlatDto))
                .collect(Collectors.toCollection(HashSet::new));
    }

    @Override
    public MovieDto findOne(String uuid) {
        MovieFlatDto movieFlatDto = this.moviesIO.read()
                .stream()
                .filter(movie -> movie.getUuid().equals(uuid))
                .findFirst()
                .orElse(null);
        return MovieDto.parse(movieFlatDto);
    }

    public MovieDto findOneByTitle(String title) {
        MovieFlatDto movieFlatDto = this.moviesIO.read()
                .stream()
                .filter(movie -> movie.getUuid().equalsIgnoreCase(title))
                .findFirst()
                .orElse(null);
        return MovieDto.parse(movieFlatDto);
    }

    @Override
    public MovieDto save(MovieDto element) {
        MovieDto temp = this.findOneByTitle(element.getTitle());
        if (temp == null) {
            this.records.add(element);
            this.export();
        }
        return temp;
    }

    @Override
    public MovieDto update(MovieDto element) {
        MovieDto movieDto = this.findOne(element.getUuid());
        if (movieDto != null) {
            movieDto = element;
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
