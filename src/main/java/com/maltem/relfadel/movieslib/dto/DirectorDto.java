package com.maltem.relfadel.movieslib.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.HashSet;

@Getter
@Setter
@JsonRootName(value = "director")
public class DirectorDto extends BaseDto{
    @NonNull
    private String fullName;
    private HashSet<MovieDto> movies;

    public DirectorDto(@NonNull String fullName) {
        this.fullName = fullName;
    }

    public DirectorDto(String uuid, @NonNull String fullName) {
        super(uuid);
        this.fullName = fullName;
    }
}
