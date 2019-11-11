package com.maltem.relfadel.movieslib.repositories;

import java.util.HashSet;

public interface Repository<T> {
    HashSet<T> findAll();
    T findOne(String uuid);
    T save(T element);
    T update(T element);
    void delete(String uuid);
}
