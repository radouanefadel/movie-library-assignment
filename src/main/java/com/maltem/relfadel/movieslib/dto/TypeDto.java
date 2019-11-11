package com.maltem.relfadel.movieslib.dto;

import lombok.Data;
import lombok.NonNull;

import java.util.HashSet;

@Data
public class TypeDto extends BaseDto {
    @NonNull
    private String label;
    private HashSet<MovieDto> movies;
}
