package dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.repository;


import org.springframework.stereotype.Repository;

import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.entity.Course;

import org.springframework.data.mongodb.repository.MongoRepository; 

@Repository
public interface CourseRepository extends MongoRepository<Course, String>{
	
	Course getCourseById(String username);
	
}