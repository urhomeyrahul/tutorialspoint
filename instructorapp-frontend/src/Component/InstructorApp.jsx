import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListCourses from './ListCourses';
import CourseComponent from './CourseComponent';


class InstructorApp extends Component {

    render() {

        return (
            <Router>
                <>
                    <h1>Instructor Application</h1>
                    <Routes>
                        <Route path='/' exact Component={ListCourses}></Route>
                        <Route path="/courses" exact Component={ListCourses}></Route>
                        <Route path='/courses/:id' exact Component={CourseComponent}></Route>
                    </Routes>

                </>
            </Router>
        )
    }

}

export default InstructorApp;