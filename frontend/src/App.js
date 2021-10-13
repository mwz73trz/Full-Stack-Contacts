import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/subjects/:subjectId" exact component={SubjectPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
