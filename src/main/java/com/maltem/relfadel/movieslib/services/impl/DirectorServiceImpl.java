package com.maltem.relfadel.movieslib.services.impl;

import com.maltem.relfadel.movieslib.dto.DirectorDto;
import com.maltem.relfadel.movieslib.repositories.DirectorRepository;
import com.maltem.relfadel.movieslib.services.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class DirectorServiceImpl implements DirectorService {
    @Autowired
    private DirectorRepository repository;

    @Override
    public HashSet<DirectorDto> findAll() {
        return this.repository.findAll();
    }

    @Override
    public DirectorDto findOne(String uuid) {
        return this.repository.findOne(uuid);
    }

    @Override
    public DirectorDto findOneByFullName(String fullName) {
        return this.repository.findOneByFullName(fullName);
    }

    @Override
    public DirectorDto findMovies(String fullName) {
        return this.repository.findMovies(fullName);
    }

    @Override
    public DirectorDto save(DirectorDto element) {
        return null;
    }

    @Override
    public DirectorDto update(DirectorDto element) {
        return this.repository.update(element);
    }

    @Override
    public void delete(String uuid) {
        this.repository.delete(uuid);
    }
}
