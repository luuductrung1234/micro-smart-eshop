package com.example.eshop.user;

import com.example.eshop.seedwork.BadRequestException;
import com.example.eshop.user.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public List<User> getAll(String searchText) {
        if(StringUtils.isNotEmpty(searchText))
            return userRepository.findByNameContainingOrEmailContaining(searchText, searchText);
        return userRepository.findAll();
    }

    public Optional<User> getById(long id) {
        return userRepository.findById(id);
    }

    public User add(User user) {
        var isExitedEmail = userRepository.selectExistsEmail(user.getEmail());
        if(isExitedEmail){
            throw new BadRequestException("Email " + user.getEmail() + " taken");
        }
        return userRepository.save(user);
    }

    public Optional<Long> delete(long id) {
        var userToDeleteOptional = userRepository.findById(id);
        if(!userToDeleteOptional.isPresent())
            throw new UserNotFoundException("User with id " + id + " does not exists");

        userRepository.deleteById(id);
        return Optional.of(id);
    }

    public Optional<User> update(long id, User user) {
        var userToUpdateOptional = userRepository.findById(id);
        if(!userToUpdateOptional.isPresent())
            throw new UserNotFoundException("User with id " + id + " does not exists");

        var userToUpdate = userToUpdateOptional.get();
        userToUpdate.setName(user.getName());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setGender(user.getGender());
        return Optional.of(userRepository.save(userToUpdate));
    }
}
