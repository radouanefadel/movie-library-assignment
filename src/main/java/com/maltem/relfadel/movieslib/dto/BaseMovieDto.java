package com.maltem.relfadel.movieslib.dto;

import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
public abstract class BaseMovieDto extends BaseDto {
    protected String title;
    protected String releaseDate;

    public Date getDate() {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        try {
            date = format.parse (this.releaseDate);
        } catch(ParseException e) {
            System.out.println("Error while parsing date");
        }
        return date;
    }
}
