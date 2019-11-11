package com.maltem.relfadel.movieslib.repositories;

import com.maltem.relfadel.movieslib.dto.MovieFlatDto;
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

    @Override
    public HashSet<TypeDto> findAll() {
        return this.records.isEmpty() ? this.getRecords() : this.records;
    }

    @Override
    public TypeDto findOne(String uuid) {
        return this.records.stream()
                .filter(typeDto -> typeDto.getUuid().equals(uuid))
                .findFirst()
                .orElse(null);
    }

    @Override
    public TypeDto save(TypeDto element) {
        this.records.add(element);
        return element;
    }

    @Override
    public TypeDto update(TypeDto element) {
        TypeDto typeDto = this.findOne(element.getUuid());
        typeDto = element;
        return typeDto;
    }

    @Override
    public void delete(String uuid) {
        TypeDto typeDto = this.findOne(uuid);
        this.records.remove(typeDto);
    }

    public TypeDto findOneByLabel(String label) {
        return this.records.stream()
                .filter(typeDto -> typeDto.getLabel().equalsIgnoreCase(label))
                .findFirst()
                .orElse(null);
    }

    @Override
    public HashSet<TypeDto> getRecords() {
        HashSet<MovieFlatDto> movies = this.moviesIO.read();
        HashSet<String> typeLabels = movies.stream()
                .map(movieFlatDto -> movieFlatDto.getType())
                .collect(Collectors.toCollection(HashSet::new));
        typeLabels.forEach(label -> {
            if (this.records.isEmpty() || this.findOneByLabel(label) == null) {
                TypeDto typeDto = new TypeDto(label);
                typeDto.setUuid(null);
                this.records.add(typeDto);
            }
        });
        return this.records;
    };
}
