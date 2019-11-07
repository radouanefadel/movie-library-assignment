package com.maltem.relfadel.movieslib.models;

import lombok.Data;

import java.util.Date;

@Data
public class Movie {
    private String title;
    private String director;
    private Date releaseDate;
    private String type;
}
