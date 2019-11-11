package com.maltem.relfadel.movieslib.repositories;

import lombok.Data;

import java.util.HashSet;

@Data
public abstract class Storage<T> {
    protected HashSet<T> records = new HashSet<>();
}
