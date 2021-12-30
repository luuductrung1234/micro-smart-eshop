package com.example.fullstackdemo1.student;

import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAll(String searchText) {
        if(StringUtils.isNotEmpty(searchText))
            return studentRepository.findByNameContainingOrEmailContaining(searchText, searchText);
        return studentRepository.findAll();
    }

    public Optional<Student> getById(long id) {
        return studentRepository.findById(id);
    }

    public Student add(Student student) {
        return studentRepository.save(student);
    }
}
