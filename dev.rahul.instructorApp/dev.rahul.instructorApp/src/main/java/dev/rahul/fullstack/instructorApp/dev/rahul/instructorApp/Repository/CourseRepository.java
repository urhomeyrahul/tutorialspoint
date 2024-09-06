package dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.Repository;


import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.Entity.Course;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository; 


@Repository
public interface CourseRepository extends MongoRepository<Course, String>{
	
	Course getCourseById(String username);
	
}