package com.maltem.relfadel.movieslib.dto;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@Getter
@JsonSubTypes({
        @Type(value = BaseMovieDto.class),
        @Type(value = DirectorDto.class, name = "director"),
        @Type(value = TypeDto.class, name="type")
})
public abstract class BaseDto {

    protected String uuid;

    public BaseDto(String uuid) {
        this.setUuid(uuid);
    }

    public void setUuid(String uuid) {
        this.uuid = (this.uuid == null || this.uuid == "") && (uuid == null || uuid == "")
                ? UUID.randomUUID().toString()
                : uuid;
    }
}
