package com.maltem.relfadel.movieslib.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.HashSet;

@Getter
@Setter
@JsonRootName(value = "type")
public class TypeDto extends BaseDto {
    @NonNull
    private String label;
    private HashSet<MovieDto> movies;

    public TypeDto(@NonNull String label) {
        this.label = label;
    }

    public TypeDto(String uuid, @NonNull String label) {
        super(uuid);
        this.label = label;
    }
}
