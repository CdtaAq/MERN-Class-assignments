// App.js - Main application component
import React from 'react';
import StudentComponent from './StudentComponent';

function App() {
return (
<div className="App">
<h1>React Lifecycle & Data Flow Demo</h1>
<StudentComponent />
</div>
);
}

export default App;

// StudentComponent.js - Parent component
import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

class StudentComponent extends Component {
constructor(props) {
super(props);
console.log('StudentComponent constructor called');

this.state = {
student: {
userName: '',
userAddress: ''
},
previousState: null
};
}

// Method to receive data from child component
handleDataFromChild = (userName, userAddress) => {
console.log('Data received from child:', userName, userAddress);
this.setState({
student: {
userName,
userAddress
}
});
}

// Lifecycle method: gets called before the component is removed from DOM
componentWillUnmount() {
console.log('StudentComponent will unmount');
// Cleanup code can go here
}

// Lifecycle method: gets called right before update
getSnapshotBeforeUpdate(prevProps, prevState) {
console.log('StudentComponent getSnapshotBeforeUpdate');
console.log('Previous state:', prevState);
console.log('Previous props:', prevProps);

// Return previous state to be used in componentDidUpdate
return { prevState, prevProps };
}

// Lifecycle method: gets called after update
componentDidUpdate(prevProps, prevState, snapshot) {
console.log('StudentComponent componentDidUpdate');

if (snapshot) {
console.log('Snapshot from getSnapshotBeforeUpdate:', snapshot);

// Set the previous state to state for requirement #5
// Using setTimeout to avoid infinite loop of updates
if (!this.state.previousState) {
this.setState({
previousState: snapshot.prevState
});
}
}
}

render() {
const { student } = this.state;
console.log('StudentComponent rendering with student data:', student);

return (
<div className="student-component">
<h2>Student Component</h2>
{student.userName && (
<div className="student-info">
<p><strong>Name:</strong> {student.userName}</p>
<p><strong>Address:</strong> {student.userAddress}</p>
</div>
)}

<ChildComponent
onDataSubmit={this.handleDataFromChild}
studentData={student}
/>

{this.state.previousState && (
<div className="previous-state">
<h3>Previous State:</h3>
<p>Name: {this.state.previousState.student.userName}</p>
<p>Address: {this.state.previousState.student.userAddress}</p>
</div>
)}
</div>
);
}
}

export default StudentComponent;

// ChildComponent.js - Pure child component
import React, { PureComponent } from 'react';

class ChildComponent extends PureComponent {
constructor(props) {
super(props);
console.log('ChildComponent constructor called');

this.state = {
userName: '',
userAddress: '',
formSubmitted: false
};
}

// Handle input changes
handleInputChange = (event) => {
const { name, value } = event.target;
this.setState({ [name]: value });
}

// Submit form data to parent component
handleSubmit = (event) => {
event.preventDefault();

// Send data up to parent component
this.props.onDataSubmit(this.state.userName, this.state.userAddress);

// Mark form as submitted for conditional rendering
this.setState({ formSubmitted: true });
}

// Lifecycle method: This won't actually be called in PureComponent
// PureComponent implements shouldComponentUpdate with a shallow prop and state comparison
shouldComponentUpdate(nextProps, nextState) {
console.log('ChildComponent shouldComponentUpdate');
console.log('Current props:', this.props);
console.log('Next props:', nextProps);
console.log('Current state:', this.state);
console.log('Next state:', nextState);

// Condition to prevent render if data hasn't changed
// PureComponent already does this but we're implementing it explicitly for demonstration
const propsChanged =
nextProps.studentData.userName !== this.props.studentData.userName ||
nextProps.studentData.userAddress !== this.props.studentData.userAddress;

const stateChanged =
nextState.userName !== this.state.userName ||
nextState.userAddress !== this.state.userAddress ||
nextState.formSubmitted !== this.state.formSubmitted;

// Only update if props or state changed
return propsChanged || stateChanged;
}

// Lifecycle method: gets called before the component is removed from DOM
componentWillUnmount() {
console.log('ChildComponent will unmount');
// Cleanup code can go here
}

render() {
console.log('ChildComponent rendering');
const { userName, userAddress } = this.state;
const { studentData } = this.props;

return (
<div className="child-component">
<h3>Child Component</h3>

{/* Display studentData if available from props */}
{studentData.userName && (
<div className="received-data">
<h4>Data Received from Parent:</h4>
<p>Name: {studentData.userName}</p>
<p>Address: {studentData.userAddress}</p>
</div>
)}

<form onSubmit={this.handleSubmit}>
<div className="form-group">
<label htmlFor="userName">Name:</label>
<input
type="text"
id="userName"
name="userName"
value={userName}
onChange={this.handleInputChange}
required
/>
</div>

<div className="form-group">
<label htmlFor="userAddress">Address:</label>
<input
type="text"
id="userAddress"
name="userAddress"
value={userAddress}
onChange={this.handleInputChange}
required
/>
</div>

<button type="submit">Submit</button>
</form>
</div>
);
}
}

export default ChildComponent;

// Additional file for demonstration:
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);
