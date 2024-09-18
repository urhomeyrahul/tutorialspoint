package dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.entity.Course;
import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.model.CourseModel;

@Service
public interface CourseService {
	
	List<Course> findAll();
	public Optional<Course> findById(Long id); 
	public Optional<Course> deleteById(Long id);
	public Course save (Course course);
	public Course addNewCourse(CourseModel courseModel);

}

//}