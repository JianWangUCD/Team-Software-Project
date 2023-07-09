package com.fantasticsix.service;


import com.fantasticsix.model.User;

import java.util.Map;

public interface UserService {
    User register(User user);
    Map<String, String> login(String username, String password);

}