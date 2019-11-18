package com.maltem.relfadel.movieslib.repositories;

import com.maltem.relfadel.movieslib.dto.MovieDto;
import com.maltem.relfadel.movieslib.dto.TypeDto;
import com.maltem.relfadel.movieslib.util.MoviesIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class TypeRepository extends Storage<TypeDto> implements Repository<TypeDto> {

    @Autowired
    private MoviesIO moviesIO;

    @Autowired
    private MovieRepository movieRepository;

    @Override
    public HashSet<TypeDto> findAll() {
        return this.records.isEmpty() ? this.getRecords() : this.records;
    }

    @Override
    public TypeDto findOne(String uuid) {
        return this.records.stream()
                .filter(type -> type.getUuid().equals(uuid))
                .findFirst()
                .orElse(null);
    }

    public TypeDto findOneByLabel(String label) {
        return this.records.stream()
                .filter(type -> type.getLabel().equalsIgnoreCase(label))
                .findFirst()
                .orElse(null);
    }

    @Override
    public TypeDto save(TypeDto element) {
        return null;
    }

    @Override
    public TypeDto update(TypeDto element) {
        return null;
    }

    @Override
    public HashSet<TypeDto> getRecords() {
        HashSet<MovieDto> movies = this.movieRepository.findAll();
        HashSet<String> typeNames = movies.stream()
                .map(movie -> movie.getType().getLabel())
                .collect(Collectors.toCollection(HashSet::new));
        typeNames.forEach(typeName -> {
            if (this.records.isEmpty() || this.findOneByLabel(typeName) == null) {
                TypeDto type = new TypeDto(typeName);
                type.setUuid(null);
                this.records.add(type);
            }
        });
        return this.records;
    };

    @Override
    public void delete(String uuid) { ; };

    public TypeDto findMovies(String label) {
        TypeDto type = this.findOneByLabel(label);
        if (type != null) {
            HashSet<MovieDto> movies = this.movieRepository.records
                    .stream()
                    .filter(movie -> movie.getType().getLabel().equalsIgnoreCase(label))
                    .collect(Collectors.toCollection(HashSet::new));
            type.setMovies(movies);
        }
        return type;
    }
}
