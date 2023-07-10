package org.fantasticsix.service;

import org.fantasticsix.domain.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> getAllUsers();

    User getUser(long id);

    void deleteUser(long id);

    User updateUser(long id, User user);

    User createUser(User user);

    User register(User user);

    Map<String, String> login(String username, String password);

}