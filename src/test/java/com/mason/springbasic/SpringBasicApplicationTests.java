package com.mason.springbasic;

import com.mason.springbasic.service.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SpringBasicApplicationTests {

    @Autowired
    UserServiceImpl userService;

    @Test
    void contextLoads() {
        //userService.addUser("jack", "123456");
        //userService.delUser("jack");
        //userService.delUserByName("j");
        //userService.findUserByName("jack");
        userService.updateUserByUsername("jack");
    }

}
