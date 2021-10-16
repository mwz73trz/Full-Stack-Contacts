import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubjectPage from "./pages/SubjectPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import UserContext from "./contexts/UserContext";

class App extends Component {
  state = {
    user: null,
  };

  updateUser = (newUserData) => {
    this.setState({ user: newUserData });
  };

  renderLoginPage = (routeProps) => {
    return <LoginPage {...routeProps} completeLogin={this.updateUser} />;
  };

  render() {
    return (
      <div className="App">
        <Router>
          <UserContext.Provider value={this.state.user}>
            <div>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact render={this.renderLoginPage} />
              <Route
                path="/subjects/:subjectId"
                exact
                component={SubjectPage}
              />
              <Route
                path="/contacts/:contactId"
                exact
                component={ContactPage}
              />
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;
