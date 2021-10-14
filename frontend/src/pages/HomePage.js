import { Component } from "react";
import { Link } from "react-router-dom";
import contactAPI from "../api/contactAPI";
import SubjectList from "../components/SubjectsList";
import UserContext from "../contexts/UserContext";

class HomePage extends Component {
  state = {
    subjects: [],
  };

  getSubjectLists = async () => {
    try {
      let token = this.context ? this.context.token : null;
      if (token) {
        let subjectListData = await contactAPI.getSubjects(token);
        this.setState({ subjects: subjectListData });
      }
    } catch {}
  };

  createSubject = async () => {
    let inputTitle = document.getElementById("new-subject-title");
    let inputDescription = document.getElementById("new-subject-description");
    let token = this.context ? this.context.token : null;
    if (inputTitle && inputDescription && token) {
      let newSubjectParams = {
        title: inputTitle.value,
        description: inputDescription.value,
      };
      let data = await contactAPI.createSubject(newSubjectParams, token);
      console.log("new subject", data);
      if (data) {
        let newSubjects = [...this.state.subjects, data];
        this.setState({ subjects: newSubjects });
      }
    }
  };

  deleteSubject = async (subjectId) => {
    try {
      let token = this.context ? this.context.token : null;
      if (subjectId > 0 && token) {
        let result = await contactAPI.deleteSubject(subjectId, token);
        if (result.success) {
          let newSubjects = this.state.subjects.filter((subject, index) => {
            return subject.id !== subjectId;
          });
          this.setState({ subjects: newSubjects });
        }
      }
    } catch {}
  };

  componentDidMount() {
    this.getSubjectLists();
  }

  renderWelcome() {
    if (!this.context) {
      return (
        <Link to="/login">
          <button>Login</button>
        </Link>
      );
    }
    let subjectListElements = this.state.subjects.map((subject, index) => {
      return (
        <li key={`subject-${index}`}>
          <SubjectList subject={subject} handleDelete={this.deleteSubject} />
        </li>
      );
    });

    return (
      <div>
        <h2>
          Welcome to your Contact Group Manager {this.context.user.username}
        </h2>
        <h2>Contact Groups:</h2>
        <ul className="simple-list">{subjectListElements}</ul>
        <hr />
        <input id="new-subject-title" placeholder="new title" />
        <input id="new-subject-description" placeholder="new description" />
        <button onClick={this.createSubject}>Add Contact Group</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        {this.renderWelcome()}
      </div>
    );
  }
}

HomePage.contextType = UserContext;

export default HomePage;
