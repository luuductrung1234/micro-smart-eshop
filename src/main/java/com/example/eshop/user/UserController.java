package com.example.eshop.user;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/users")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> getAllUsers(@Param("searchText") String searchText) {
        return userService.getAll(searchText);
    }

    @GetMapping("{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") String userId) {
        return userService.getById(Long.parseLong(userId))
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public User addUser(@Valid @RequestBody User user) {
        var savedUser = userService.add(user);
        log.info("Created User Id:" + savedUser.getId());
        return savedUser;
    }

    @PutMapping("{userId}")
    public ResponseEntity<User> updateUser(@PathVariable("userId") String userId, @RequestBody User user) {
        var response = userService.update(Long.parseLong(userId), user)
                .map(updatedUser -> ResponseEntity.ok().body(updatedUser))
                .orElseGet(() -> ResponseEntity.notFound().build());
        log.info("Updated User Id:" + userId);
        return response;
    }

    @DeleteMapping("{userId}")
    public ResponseEntity<Long> deleteUser(@PathVariable("userId") String userId) {
        var response = userService.delete(Long.parseLong(userId))
                .map(deletedUserId -> ResponseEntity.ok().body(deletedUserId))
                .orElseGet(() -> ResponseEntity.notFound().build());
        log.info("Deleted User Id:" + userId);
        return response;
    }
}
