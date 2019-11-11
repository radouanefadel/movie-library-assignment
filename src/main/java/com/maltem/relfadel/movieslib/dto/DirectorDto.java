package com.maltem.relfadel.movieslib.dto;

import lombok.Data;
import lombok.NonNull;

import java.util.HashSet;

@Data
public class DirectorDto extends BaseDto{
    @NonNull
    private String fullName;
    private HashSet<MovieDto> movies;
}
