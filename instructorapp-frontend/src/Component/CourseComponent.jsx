import React, { Component } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import CourseService from '../Service/CourseService';
import { useNavigate, useParams } from 'react-router-dom';

const Instructor = 'in28minutes';

// HIGH ORDER COMPONENT TO USE PARAMS - after v6 using react-router-dom we use HOC to inject parameters into class component

function withRouter(Component) {
    return function WrapperComponent(props) {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />
    }
}

class CourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            username: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {

        console.log(this.state.id);
        if (this.state.id === -1) { return }

        CourseService.retrieveCourseById(Instructor, this.state.id).then(
            response => {
                console.log(' Api Response :', response.data);
                this.setState({ username: response.data.username });
            }
        );

    }

    validate(values) {

        let error = {};
        if (!values.username) {
            error.username = "Enter a Description";
        }
        else if (values.username < 5) {
            error.username = "Enter a description more than 5 words atleast";
        }
        return error;
    }

    onSubmit(values) {

        let username = Instructor;

        let course = {

            id: this.state.id,
            username: values.username,
            targetDate: values.targetDate

        }

        if (this.state.id == -1) {
            CourseService.addCourse(username, course).then(
                () => this.props.navigate('/courses'));
        }

        else {
            CourseService.updateCourse(username, this.state.id, course).then
                (() => this.props.navigate('/courses'));
        }

        console.log("form data : ", values);
    }

    render() {

        // DESCTRUCTING. BREAKING DOWN COMPLEX DATA STRUCTURE INTO SMALLER VARIABLES
        // let arr = [ "ninja" , "tokyo"]; // let [firstword, secondword] = arr; 
        // also written as - let id = this.state.id // let description = this.state.description;

        let { id, username } = this.state;

        return (

            <div>
                <h3>Course Details</h3>
                <div className='container'>
                    <Formik initialValues={{ id, username }}
                        onSubmit={this.onSubmit}
                        enableReinitialize={true}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="username" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>ID</label>
                                        <Field className="form-control" name="id" type="text" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" name="username" type="text" />
                                    </fieldset>
                                    <button className="btn btn-success" onClick={this.onSubmit} type="submit"> Save </button>
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        )
    }
}
export default withRouter(CourseComponent);