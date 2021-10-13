import { Component } from "react";
import { Link } from "react-router-dom";

class SubjectList extends Component {
  render() {
    return (
      <span>
        <Link to={`/subjects/${this.props.subject.id}`}>
          {this.props.subject.title}
        </Link>
        <button onClick={() => this.props.handleDelete(this.props.subject.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default SubjectList;
