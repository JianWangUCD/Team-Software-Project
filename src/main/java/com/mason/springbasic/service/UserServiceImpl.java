package com.mason.springbasic.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.mason.springbasic.dao.UserDao;
import com.mason.springbasic.pojo.UserPojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    @Autowired
    UserDao userDao;

    public void addUser(String username, String password) {
        userDao.insert(new UserPojo(username, password));
    }

    public void delUser(String username) {
        userDao.deleteById(username);
    }

    public void delUserByName(String username) {
        userDao.delete(new QueryWrapper<UserPojo>().like("username", username));
    }

    public void findUserByName(String username) {
        UserPojo userPojo = userDao.selectOne(new QueryWrapper<UserPojo>().eq("username", username));
        System.out.println(userPojo);
    }

    public void updateUserByUsername(String username){
        UserPojo userPojo = userDao.selectById(username);
        userPojo.setPassword("111111");
        userDao.update(userPojo,new QueryWrapper<UserPojo>().eq("username",username));
    }
}
