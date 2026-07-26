package com.giri.SpringJDBCDemo;

import com.giri.SpringJDBCDemo.model.Student;
import com.giri.SpringJDBCDemo.repo.StudentRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SpringJdbcDemoApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(SpringJdbcDemoApplication.class, args);
		Student s = context.getBean(Student.class);
		s.setId(111);
		s.setName("Shlokh");
		s.setTech("Python");
		StudentRepo repo = context.getBean(StudentRepo.class);
		repo.save(s);
		System.out.println(repo.findAll());
	}

}
