package com.example.login;

import com.example.login.service.UserServiceInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class Demo002ApplicationTests {
@Autowired
private UserServiceInterface userServiceInterface;
    @Test
    void contextLoads() {
//        User user = new User("HHH","ASD");
//        userMapper.add(user);
//        List<User> users = userMapper.queryAll();
//
//        users.forEach(System.out::println);
        userServiceInterface.queryAll().forEach(System.out::println);

    }

}
