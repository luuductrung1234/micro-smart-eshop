package com.example.eshop.user;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1)
    @GeneratedValue(
            generator = "user_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotBlank
    @Column(nullable = false)
    private String name;
    @Email
    @Column(unique = true)
    private String email;
    @NotBlank
    @Column(nullable = false)
    private String password;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    @Column(nullable = false)
    private String location;

    public User(String name, String email, String password, Gender gender, Role role, String location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
