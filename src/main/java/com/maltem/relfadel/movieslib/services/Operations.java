package com.maltem.relfadel.movieslib.services;

import java.util.HashSet;

public interface Operations<T> {
    HashSet<T> findAll();
    T findOne(String uuid);
    T save(T element);
    T update(T element);
    void delete(String uuid);
}
