package com.maltem.relfadel.movieslib.controllers;

import com.maltem.relfadel.movieslib.dto.TypeDto;
import com.maltem.relfadel.movieslib.services.TypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;

@RestController
@RequestMapping("/types")
public class TypeController {

    @Autowired
    TypeService service;

    @GetMapping
    public HashSet<TypeDto> findAll() {
        return this.service.findAll();
    }

    @GetMapping("/{id}")
    public TypeDto findOne(@PathVariable String uuid) {
        return this.service.findOne(uuid);
    }
}
