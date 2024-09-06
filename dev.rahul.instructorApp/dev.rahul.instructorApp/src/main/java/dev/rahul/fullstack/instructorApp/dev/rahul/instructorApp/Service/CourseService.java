package dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.util.Iterator;

import org.springframework.stereotype.Service;

import dev.rahul.fullstack.instructorApp.dev.rahul.instructorApp.Entity.Course;

@Service
public class CourseService {
	
	private static List<Course> courses = new ArrayList<Course>();
	private static long idCounter = 0;
	
	//. NO DATABASE, BUT DIRECTLY HARDCODING INTO THE STATIC CONSTRUCTOR AT TIME OF RUNNING
	
	static {
		
		courses.add(new Course(++idCounter, "in28minutes","Learn Full stack with Spring Boot and Angular"));
		courses.add(new Course(++idCounter, "in28minutes", "Learn Full stack with Spring Boot and React"));
		courses.add(new Course(++idCounter, "in28minutes", "Master Microservices with Spring Boot and Spring Cloud"));
		courses.add(new Course(++idCounter, "in28minutes","Deploy Spring Boot Microservices to Cloud with Docker and Kubernetes"));
	}

	//DISPLAYING ALL THE COURSES IN 1 GO

	public List<Course>findAll() {
		return courses;
	} 

	//FINDING BY A PARTICULAR ID
	
	public Optional<Course> findById(long id){
		for(Course course : courses) {
			if(course.getId() == id) {
				return Optional.of(course);
			}
		}
		return null;
	}
	
	//DELETING A COURSE FROM LIST
	
	public Optional<Course> deleteById(long id) {
	
		Iterator<Course> iterator = courses.iterator();
		while(iterator.hasNext()) {
			Course course = iterator.next();
			if(course.getId() == id) {
				iterator.remove();
				return Optional.of(course);
			}
		}
		return Optional.empty();
	}

	//DOING A ADD FEATURE IN COURSE LIST
	
	public Course save (Course course) {
		if(course.getId() == -1 || course.getId() == 0) {
			course.setId(++idCounter);
			courses.add(course);
		}
		else {
			deleteById(course.getId());
			courses.add(course);
		}
		
		return course;
	}
}