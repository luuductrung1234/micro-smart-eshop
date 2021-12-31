package com.example.fullstackdemo1.student;

import com.example.fullstackdemo1.seedwork.BadRequestException;
import com.example.fullstackdemo1.student.exception.StudentNotFoundException;
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
        var isExitedEmail = studentRepository.selectExistsEmail(student.getEmail());
        if(isExitedEmail){
            throw new BadRequestException("Email " + student.getEmail() + " taken");
        }
        return studentRepository.save(student);
    }

    public Optional<Long> delete(long id) {
        var studentToDeleteOptional = studentRepository.findById(id);
        if(!studentToDeleteOptional.isPresent())
            throw new StudentNotFoundException("Student with id " + id + " does not exists");

        studentRepository.deleteById(id);
        return Optional.of(id);
    }

    public Optional<Student> update(long id, Student student) {
        var studentToUpdateOptional = studentRepository.findById(id);
        if(!studentToUpdateOptional.isPresent())
            throw new StudentNotFoundException("Student with id " + id + " does not exists");

        var studentToUpdate = studentToUpdateOptional.get();
        studentToUpdate.setName(student.getName());
        studentToUpdate.setEmail(student.getEmail());
        studentToUpdate.setGender(student.getGender());
        return Optional.of(studentRepository.save(studentToUpdate));
    }
}
