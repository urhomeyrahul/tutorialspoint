import 'axios';
import axios from 'axios';

const Instructor = "in28minutes";
const Course_API_URL = 'http://localhost:8080';
const Instructor_API_URL = `${Course_API_URL}/instructors/${Instructor}`;

class CourseService {

    deleteCourse(name, id) {
        return axios.delete(`${Instructor_API_URL}/courses/${id}`);
    }

    retreiveAllCourses(name) {
        return axios.get(`${Instructor_API_URL}/courses`);
    }

    retrieveCourseById(name,id) {
        return axios.get(`${Instructor_API_URL}/courses/${id}`);
    }

    updateCourse(name,id, course){
        return axios.put(`${Instructor_API_URL}/courses/${id}`, course);
    }

    addCourse(name,course) {
        return axios.post(`${Instructor_API_URL}/courses`, course);
    }
}

export default new CourseService()