package com.maltem.relfadel.movieslib.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import lombok.Data;

@Data
@JsonSubTypes({
        @Type(value = MovieDto.class),
        @Type(value = MovieFlatDto.class)
})
public abstract class BaseMovieDto extends BaseDto {
    protected String title;
    protected String releaseDate;
}
