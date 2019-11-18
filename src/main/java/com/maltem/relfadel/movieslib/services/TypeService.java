package com.maltem.relfadel.movieslib.services;

import com.maltem.relfadel.movieslib.dto.TypeDto;

public interface TypeService extends Operations<TypeDto> {
    TypeDto findOneByLabel(String label);
    TypeDto findMovies(String label);
}
