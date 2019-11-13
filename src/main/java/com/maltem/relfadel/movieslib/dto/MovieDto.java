package com.maltem.relfadel.movieslib.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class MovieDto extends BaseMovieDto {
    @NonNull
    @JsonProperty("director")
    private DirectorDto director;

    @NonNull
    @JsonProperty("type")
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


    public void clone(MovieDto movieDto) {
        this.setUuid(movieDto.getUuid());
        this.setTitle(movieDto.getTitle());
        this.setDirector(movieDto.getDirector());
        this.setType(movieDto.getType());
        this.setReleaseDate(movieDto.getReleaseDate());
    }

}
