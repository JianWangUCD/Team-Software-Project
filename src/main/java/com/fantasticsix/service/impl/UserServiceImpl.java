package com.fantasticsix.service.impl;

import com.fantasticsix.exception.UserNotFoundException;
import com.fantasticsix.model.User;
import com.fantasticsix.repository.UserRepository;
import com.fantasticsix.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

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
}
