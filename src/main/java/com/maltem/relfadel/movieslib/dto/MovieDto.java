package com.maltem.relfadel.movieslib.dto;

import lombok.Data;

@Data
public class MovieDto extends BaseMovieDto {
    private DirectorDto director;
    private TypeDto type;

    public static MovieDto parse(MovieFlatDto dto) {
        MovieDto movie = new MovieDto();
        movie.setUuid(dto.getUuid());
        movie.setTitle(dto.getTitle());
        movie.setReleaseDate(dto.getReleaseDate());
        movie.setDirector(new DirectorDto(dto.getDirector()));
        movie.setType(new TypeDto(dto.getType()));
        return movie;
    }
}
