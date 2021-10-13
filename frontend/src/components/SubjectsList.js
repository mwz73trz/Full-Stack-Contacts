import { Component } from "react";

class SubjectList extends Component {
  render() {
    return (
      <span>
        {this.props.subject.title}
        <button onClick={() => this.props.handleDelete(this.props.subject.id)}>
          Delete
        </button>
      </span>
    );
  }
}

export default SubjectList;
