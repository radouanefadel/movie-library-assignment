package com.maltem.relfadel.movieslib.services;

import com.maltem.relfadel.movieslib.dto.DirectorDto;

public interface DirectorService extends Operations<DirectorDto> {
    DirectorDto findOneByFullName(String fullName);
    DirectorDto findMovies(String fullName);
}
