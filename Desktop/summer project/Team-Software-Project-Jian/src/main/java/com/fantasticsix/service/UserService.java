package com.fantasticsix.service;


import com.fantasticsix.model.User;

public interface UserService {
    User register(User user);
    String login(String username, String password);

    String getUserRole(String username);
}