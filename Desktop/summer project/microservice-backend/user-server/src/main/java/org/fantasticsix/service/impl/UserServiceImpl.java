package org.fantasticsix.service.impl;

import org.fantasticsix.domain.User;
import org.fantasticsix.exception.UserNotFoundException;
import org.fantasticsix.repository.UserRepository;
import org.fantasticsix.service.UserService;
import org.fantasticsix.util.JwtTokenUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    private final JwtTokenUtil jwtTokenUtil;

    public UserServiceImpl(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public List<User> getAllUsers() {
        logger.trace("Entered getAllUsers method");

        List<User> users = userRepository.findAll();

        return users;
    }

    @Override
    public User getUser(long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public void deleteUser(long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }

    @Override
    public User updateUser(long id, User user) {
        User userUpdated = userRepository.save(user);
        return userUpdated;
    }

    @Override
    public User createUser(User user) {
        User createdUser = userRepository.save(user);
        return createdUser;
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
        userInfo.put("id", String.valueOf(user.getId()));
        userInfo.put("username", user.getUsername());
        userInfo.put("role", user.getRole());
        userInfo.put("token", token);

        return userInfo;
    }
}
