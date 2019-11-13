package com.maltem.relfadel.movieslib.services.impl;

import com.maltem.relfadel.movieslib.dto.MovieDto;
import com.maltem.relfadel.movieslib.repositories.MovieRepository;
import com.maltem.relfadel.movieslib.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    private MovieRepository repository;

    @Override
    public HashSet<MovieDto> findAll() {
        return this.repository.findAll();
    }

    @Override
    public MovieDto findOne(String uuid) {
        return this.repository.findOne(uuid);
    }

    @Override
    public MovieDto save(MovieDto element) {
        return repository.save(element);
    }

    @Override
    public MovieDto update(MovieDto element) {
        return this.repository.update(element);
    }

    @Override
    public void delete(String uuid) {
        this.repository.delete(uuid);
    }
}
