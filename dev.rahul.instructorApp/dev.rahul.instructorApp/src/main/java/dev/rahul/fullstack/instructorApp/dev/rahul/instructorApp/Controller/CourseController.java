package dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.entity.Course;
import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.service.CourseService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
public class CourseController{
	
	@Autowired
	public CourseService courseService;

	//DISPLAYING ALL COURSES

	@GetMapping("/instructors/{username}/courses")
	public List<Course> getAllCourses(@PathVariable String username){
		return courseService.findAll();
	}
	
	//ADDING COURSE TO THE COURSES LIST
	
	@PostMapping("/instructors/{username}/courses")
	public ResponseEntity<Void> createCourse(@PathVariable String username,
			@RequestBody Course course) {
	    Course createdCourse = courseService.save(course);
	    URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
	                                         .path("/{id}")
	                                         .buildAndExpand(createdCourse.getId())
	                                         .toUri();
	    return ResponseEntity.created(uri).build();
	}
	
	// UPDATING THE COURSE CONTENTS OF COURSE
	
	@PutMapping("/instructors/{username}/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable String username,
			@PathVariable Long id, @RequestBody Course course){
		
		return new ResponseEntity<Course>(courseService.save(course),
				HttpStatus.OK);
	}
	
	//GETTING A COURSE BY IT'S ID
	
	@GetMapping("/instructors/{username}/courses/{id}")
	public ResponseEntity<Optional<Course>> getCourseById(@PathVariable String username, @PathVariable Long id) {
		return new ResponseEntity<Optional<Course>>(courseService.findById(id),HttpStatus.OK);
	}

	//DELETEING A COURSE FROM ITS LIST

	@DeleteMapping("/instructors/{username}/courses/{id}")
	public ResponseEntity<String> deleteCourse(@PathVariable("username") String username, @PathVariable("id") Long id){
		Optional<Course> deletedCourse = courseService.deleteById(id);
		if(deletedCourse.isPresent()) {
			return ResponseEntity.ok("Deleted Successfully");
		}
		else 
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
	}
}