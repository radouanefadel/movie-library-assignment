package com.maltem.relfadel.movieslib.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@NoArgsConstructor
@Getter
public abstract class BaseDto extends RepresentationModel {

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
