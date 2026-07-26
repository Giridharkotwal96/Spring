package com.giri.SpringJDBCDemo.repo;

import com.giri.SpringJDBCDemo.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class StudentRepo {
    private JdbcTemplate template;

    public JdbcTemplate getTemplate() {
        return template;
    }

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public void save(Student student){
        String sql = "insert into student(id,name,tech) values (?,?,?)";
        int rows = template.update(sql,student.getId(),student.getName(),student.getTech());
        System.out.println(rows+" are affected");
    }
    public List<Student> findAll(){
        String sql = "select * from student";
        RowMapper<Student> mapper = new RowMapper<Student>() {
            @Override
            public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
                Student s = new Student();
                s.setId(rs.getInt(1));
                s.setName(rs.getString(2));
                s.setTech(rs.getString(3));
                return s;
            }
        };
        List<Student> students = template.query(sql,mapper);
        return students;
    }
}
