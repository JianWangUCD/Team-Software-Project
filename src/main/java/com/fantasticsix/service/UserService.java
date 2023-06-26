package com.fantasticsix.service;

import com.fantasticsix.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUser(long id);

    void deleteUser(long id);

    User updateUser(long id, User user);

    User createUser(User user);
}
