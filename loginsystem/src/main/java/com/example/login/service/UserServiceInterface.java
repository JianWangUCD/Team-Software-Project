package com.example.login.service;

import com.example.login.entity.User;

import java.util.List;


public interface UserServiceInterface {
    int add(User user);
    List<User> queryAll();
}
