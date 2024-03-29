package com.maltem.relfadel.movieslib.services.impl;

import com.maltem.relfadel.movieslib.dto.TypeDto;
import com.maltem.relfadel.movieslib.repositories.TypeRepository;
import com.maltem.relfadel.movieslib.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class TypeServiceImpl implements TypeService {

    @Autowired
    private TypeRepository repository;

    @Override
    public TypeDto findOneByLabel(String label) {
        return this.repository.findOneByLabel(label);
    }

    @Override
    public HashSet<TypeDto> findAll() {
        return this.repository.findAll();
    }

    @Override
    public TypeDto findOne(String uuid) {
        return this.repository.findOne(uuid);
    }

    @Override
    public TypeDto findMovies(String label) { return this.repository.findMovies(label); }

    @Override
    public TypeDto save(TypeDto element) {
        return this.save(element);
    }

    @Override
    public TypeDto update(TypeDto element) {
        return null;
    }

    @Override
    public void delete(String uuid) {
        this.repository.delete(uuid);
    }
}
