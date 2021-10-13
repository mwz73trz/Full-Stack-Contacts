import { Component } from "react";
import contactAPI from "../api/contactAPI";
import SubjectList from "../components/SubjectsList";

class HomePage extends Component {
  state = {
    subjects: [],
  };

  getSubjectLists = async () => {
    try {
      let subjectListData = await contactAPI.getSubjects();
      this.setState({ subjects: subjectListData });
    } catch {}
  };

  componentDidMount() {
    this.getSubjectLists();
  }

  renderWelcome() {
    let subjectListElements = this.state.subjects.map((subject, index) => {
      return (
        <li key={`subject-${index}`}>
          <SubjectList subject={subject} />
        </li>
      );
    });

    return (
      <div>
        <h2>Welcome to your Contact Group Manager</h2>
        <h2>Contact Groups:</h2>
        <ul className="simple-list">{subjectListElements}</ul>
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

export default HomePage;
