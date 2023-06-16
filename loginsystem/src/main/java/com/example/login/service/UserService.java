package com.example.login.service;

import com.example.login.entity.User;
import com.example.login.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService implements UserServiceInterface{
    @Autowired
    private UserMapper userMapper;


    @Override
    public int add(User user) {
        return userMapper.add(user);
    }

    @Override
    public List<User> queryAll() {
        return userMapper.queryAll();
    }
}
