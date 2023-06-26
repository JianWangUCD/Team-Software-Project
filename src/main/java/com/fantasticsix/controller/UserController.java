package com.fantasticsix.controller;

import java.net.URI;
import java.util.List;

import com.fantasticsix.model.User;
import com.fantasticsix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/flashsale/users")
    public List<User> getAllUsers() {

        List<User> users = userService.getAllUsers();

        return users;
    }

    //search by id
    @GetMapping("/flashsale/users/{id}")
    public User getUser(@PathVariable long id) {

        User user = userService.getUser(id);
        return user;
    }

    @DeleteMapping("/flashsale/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {

        userService.deleteUser(id);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }

    @PutMapping("/flashsale/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id,
                                                 @RequestBody User user) {

        User userUpdated = userService.updateUser(id, user);

        ResponseEntity<User> responseEntity = new ResponseEntity<User>(userUpdated, HttpStatus.OK);

        return responseEntity;
    }

    @PostMapping("/flashsale/users")
    public ResponseEntity<Void> createUser(@RequestBody User user) {

        User createdUser = userService.createUser(user);

        if (createdUser == null)
            return ResponseEntity.noContent().build();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}
