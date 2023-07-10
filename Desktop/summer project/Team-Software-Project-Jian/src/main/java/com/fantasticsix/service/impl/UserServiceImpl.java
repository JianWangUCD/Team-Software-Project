package com.fantasticsix.service.impl;


import com.fantasticsix.model.User;
import com.fantasticsix.repository.UserRepository;
import com.fantasticsix.service.UserService;
import org.springframework.stereotype.Service;
import com.fantasticsix.util.JwtTokenUtil;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public UserServiceImpl(UserRepository userRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public User register(User user) {
        // 检查用户名是否已存在
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new IllegalArgumentException("用户名已存在");
        }

        // 保存用户实体到数据库
        return userRepository.save(user);
    }



    @Override
    public Map<String, String> login(String username, String password) {
        // 验证用户名和密码
        User user = userRepository.findByUsername(username);
        if (user == null || !user.getPassword().equals(password)) {
            throw new IllegalArgumentException("用户名或密码错误");
        }

        // 生成JWT令牌
        String token = jwtTokenUtil.generateToken(user);

        // 构建返回的用户信息
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("username", user.getUsername());
        userInfo.put("role", user.getRole());
        userInfo.put("token", token);

        return userInfo;
    }


}
