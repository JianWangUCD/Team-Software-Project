package org.fantasticsix.controller;

import org.fantasticsix.domain.User;
import org.fantasticsix.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin("http://localhost:3000")
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

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            User registeredUser = userService.register(user);
            return ResponseEntity.ok("注册成功");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        try {
            Map<String, String> userInfo = userService.login(username, password);
            return ResponseEntity.ok(userInfo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
