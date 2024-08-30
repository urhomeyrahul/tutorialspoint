import React, { Component } from 'react';
import CourseService from '../Service/CourseService';
import { useNavigate } from 'react-router-dom';

const Instructor = "in28minutes";

// using HIGH ORDER COMPONENT TO NAVIGATE TO PARTICULAR COURSE INSTEAD OF REFRESHING THE WHOLE PAGE

function withnavigateWrapped(WrappedComponent) {
    return function EnhancedComponent(props) {
        const navigate = useNavigate();
        return <WrappedComponent {...props} navigate={navigate} />;
    }
}

// function withNavigateAddingWrapped(WrappedComponent) {
//     return function EnhancedComponent(props) {
//         const navigate2 = useNavigate();
//         return <WrappedComponent {...props} navigate={navigate2} />;
//     }
//}

class ListCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.updateCourseClicked = this.updateCourseClicked.bind(this);
        //  this.addCourseClicked = this.addCourseClicked.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    deleteCourse(id) {
        CourseService.deleteCourse(Instructor, id).then(
            response => {
                this.setState({ message: `Deletetion of this ${id} course successful` });
                this.refreshCourses();
            }
        )
    }

    updateCourseClicked(id) {

        console.log("update" + id);
        // this.props.history.push(`/courses/${id}`);
        // navigate(`/courses/${id}`);
        this.props.navigate(`/courses/${id}`);
    }

    addCourseClicked(id) {

        this.props.navigate2(`/courses/${id}`);

    }

    refreshCourses() {
        CourseService.retreiveAllCourses(Instructor).then(
            response => {
                //console.log(reponse);
                this.setState({ courses: response.data });
            }
        )
    }

    render() {
        return (
            <div className="container">
                <h3>All Courses</h3>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className="container">
                    <table className='table' cellSpacing={2} cellPadding={2} border={2}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Description</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.courses.map(
                                    course =>
                                        <tr key={course.id}>
                                            <td>{course.id}</td>
                                            <td>{course.username}</td>
                                            <td><button className='btn btn-warning' onClick={() => this.deleteCourse(course.id)}> Delete</button></td>
                                            <td><button className='btn btn-success' onClick={() => this.updateCourseClicked(course.id)}>Update</button></td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                    {/* <div className='row'>
                        <button className='btn btn-success' onClick={this.addCourseClicked(course.id)}>Add</button>
                    </div> */}
                </div>
            </div>
        )
    }
}

// withNavigateAddingWrapped;

export default withnavigateWrapped(ListCourses);
