import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";
import ContactPage from "./pages/ContactPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/subjects/:subjectId" exact component={SubjectPage} />
            <Route path="/contacts/:contactId" exact component={ContactPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
