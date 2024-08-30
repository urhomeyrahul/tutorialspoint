import './App.css';
import './Component/InstructorApp.jsx'
import InstructorApp from './Component/InstructorApp.jsx';
import './Component/ListCourses.jsx'
import ListCourses from './Component/ListCourses.jsx';

function App() {
  return (
    <div className="App" align='center'>
      <InstructorApp />
      {/* <ListCourses /> */}
    </div>
  );
}

export default App;
