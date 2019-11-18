package com.maltem.relfadel.movieslib.controllers;

import com.maltem.relfadel.movieslib.dto.DirectorDto;
import com.maltem.relfadel.movieslib.services.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;

@RestController
@RequestMapping("/directors")
public class DirectorController {

    @Autowired
    private DirectorService service;

    @GetMapping
    public HashSet<DirectorDto> findAll() {
        return this.service.findAll();
    }

    @GetMapping("/{uuid}")
    public DirectorDto findOne(@PathVariable String uuid) {
        return this.service.findOne(uuid);
    }

    @GetMapping("/{fullName}/movies")
    public DirectorDto findMovies(@PathVariable String fullName) {
        return this.service.findMovies(fullName);
    }

}
