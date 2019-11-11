package com.maltem.relfadel.movieslib.repositories;

import com.maltem.relfadel.movieslib.dto.DirectorDto;
import com.maltem.relfadel.movieslib.dto.MovieFlatDto;
import com.maltem.relfadel.movieslib.util.MoviesIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class DirectorRepository extends Storage<DirectorDto> implements Repository<DirectorDto> {

    @Autowired
    private MoviesIO moviesIO;

    @Override
    public HashSet<DirectorDto> findAll() {
        return this.records.isEmpty() ? this.getRecords() : this.records;
    }

    @Override
    public DirectorDto findOne(String uuid) {
        return this.records.stream()
                .filter(director -> director.getUuid().equals(uuid))
                .findFirst()
                .orElse(null);
    }

    public DirectorDto findOneByFullName(String fullName) {
        return this.records.stream()
                .filter(director -> director.getFullName().equalsIgnoreCase(fullName))
                .findFirst()
                .orElse(null);
    }

    @Override
    public DirectorDto save(DirectorDto element) {
        return null;
    }

    @Override
    public DirectorDto update(DirectorDto element) {
        return null;
    }

    @Override
    public HashSet<DirectorDto> getRecords() {
        HashSet<MovieFlatDto> movies = this.moviesIO.read();
        HashSet<String> directorNames = movies.stream()
                .map(movieFlatDto -> movieFlatDto.getDirector())
                .collect(Collectors.toCollection(HashSet::new));
        directorNames.forEach(directorName -> {
            if (this.records.isEmpty() || this.findOneByFullName(directorName) == null) {
                DirectorDto director = new DirectorDto(directorName);
                director.setUuid(null);
                this.records.add(director);
            }
        });
        return this.records;
    };

    @Override
    public void delete(String uuid) { ; }
}
