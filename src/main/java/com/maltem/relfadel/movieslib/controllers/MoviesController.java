package com.maltem.relfadel.movieslib.controllers;

import com.maltem.relfadel.movieslib.dto.MovieDto;
import com.maltem.relfadel.movieslib.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    MovieService movieService;

    @GetMapping
    public Iterable<MovieDto> all() {
        return movieService.findAll();
    }

    @GetMapping(value = "/{uuid}")
    public HttpEntity<MovieDto> findOne(@PathVariable String uuid) {
        return new ResponseEntity<>(this.movieService.findOne(uuid), HttpStatus.OK);
    }

    @PostMapping
    public MovieDto save(@RequestBody MovieDto movieDto) {
        return this.movieService.save(movieDto);
    }

    @PutMapping
    public MovieDto update(@RequestBody MovieDto movieDto) {
        return this.movieService.update(movieDto);
    }

    @DeleteMapping("/{uuid}")
    public void delete(@PathVariable String uuid) {
        this.movieService.delete(uuid);
    }

}
