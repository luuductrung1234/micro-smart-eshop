package com.example.fullstackdemo1.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("api/v1/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
//        return Arrays.asList(
//                new Student(1L, "Jamila", "jamila@amigoscode.edu", Gender.FEMALE),
//                new Student(2L, "Thomas", "thomas@learning.edu", Gender.MALE),
//                new Student(3L, "Tom", "tom@learning.edu", Gender.MALE),
//                new Student(4L, "Han", "han@learning.edu", Gender.MALE),
//                new Student(5L, "Timmy", "timmy@learning.edu", Gender.MALE),
//                new Student(6L, "John", "john@learning.edu", Gender.MALE),
//                new Student(7L, "Doe", "doe@learning.edu", Gender.MALE),
//                new Student(8L, "Phillip", "phillip@learning.edu", Gender.MALE),
//                new Student(9L, "Ton", "ton@learning.edu", Gender.MALE),
//                new Student(10L, "Bruno", "brono@learning.edu", Gender.MALE),
//                new Student(11L, "Wood", "wood@learning.edu", Gender.MALE),
//                new Student(12L, "Tim", "tim@learning.edu", Gender.MALE),
//                new Student(13L, "Howard", "howard@learning.edu", Gender.MALE),
//                new Student(14L, "Stark", "stark@learning.edu", Gender.MALE)
//        );

        return studentService.getAll();
    }
}
