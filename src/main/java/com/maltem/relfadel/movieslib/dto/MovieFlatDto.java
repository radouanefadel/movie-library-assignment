package com.maltem.relfadel.movieslib.dto;

import lombok.*;

@Data
public class MovieFlatDto extends BaseMovieDto {

    private String director;
    private String type;

    public static MovieFlatDto parse(MovieDto movieDto) {
        MovieFlatDto movieFlatDto = new MovieFlatDto();
        movieFlatDto.setUuid(movieDto.getUuid());
        movieFlatDto.setTitle(movieDto.getTitle());
        movieFlatDto.setReleaseDate(movieDto.getReleaseDate());
        movieFlatDto.setDirector(movieDto.getDirector().getFullName());
        movieFlatDto.setType(movieDto.getType().getLabel());
        return movieFlatDto;
    }
}
