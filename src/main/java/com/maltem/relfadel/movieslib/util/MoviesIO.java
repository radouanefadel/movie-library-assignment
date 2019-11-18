package com.maltem.relfadel.movieslib.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.core.util.DefaultPrettyPrinter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.maltem.relfadel.movieslib.dto.MovieFlatDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.HashSet;

@Component
public class MoviesIO {

    @Value("${datasource.json.location}")
    private String location;

    @Value("${datasource.json.fullPath}")
    private String fullPath;

    public HashSet<MovieFlatDto> read() {
        HashSet<MovieFlatDto> movies = new HashSet<MovieFlatDto>();
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<HashSet<MovieFlatDto>> typeReference = new TypeReference<HashSet<MovieFlatDto>>(){};
        InputStream inputStream = TypeReference.class.getResourceAsStream(this.location);
        try {
            movies = mapper.readValue(new File(Paths.get(this.fullPath).toAbsolutePath().toString()), typeReference);
            inputStream.close();
        } catch (IOException e) {
            System.out.println("Error while reading the JSON file!");
        }
        return movies;
    }

    public void write(HashSet<MovieFlatDto> movies) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        ObjectWriter writer = mapper.writer(new DefaultPrettyPrinter());
        try {
            String stringify = writer.writeValueAsString(movies);
            mapper.writeValue(new File(Paths.get(this.fullPath).toAbsolutePath().toString()), movies);
            // Files.write(Paths.get(this.fullPath), stringify.getBytes(), StandardOpenOption.CREATE, StandardOpenOption.APPEND);
        } catch (IOException e) {
            System.out.println("Error while updating the JSON file!");
        }
    };
}
